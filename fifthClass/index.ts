import express,{Request,Response,NextFunction,Express} from 'express'
import { Error } from 'sequelize'
import { sequelize } from './config/sequelize'
import User from './models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const port  = 4000
const app:Express = express()
app.use(express.json())

const loggingMiddleware = (req:Request,res:Response, next:NextFunction)=>{
    console.log(`${req.method}- ${req.path} ${new Date().toISOString()}`);
    next()
}
app.use(loggingMiddleware)


app.get('/hello',(req:Request,res:Response,next:NextFunction)=>{
    console.log('this is a middleware')
    next()
},
(req:Request,res:Response)=>{
    res.send(`this is a get route`)
})

app.post("/auth/register", async (req: Request, res: Response) => {
    const { firstName, lastname, email, password } = req.body
    console.log(firstName, lastname, email, password);
    
    // 1. Correctly check for missing fields and provide a clear error message (Fix 1)
    if (!firstName || !lastname || !email || !password) {
        return res.status(400).json({ 
            message: "Missing required fields. Please provide firstName, lastname, email, and password." 
        })
    }


    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } })

        if (existingUser) {
            // 2. Consistent JSON object response for existing user (Fix 2)
            return res.status(409).json({ message: "User with this email already exists" })
        }

        // Create new user
        console.log(`creating user`);
        
        const hashedPass =await  bcrypt.hash(password,10)
        const newUser = await User.create({ firstName, lastname, email, password:hashedPass })
        const formatResponse = {
            id:newUser.id,
            firstName: newUser.firstName,
            lastname:newUser.lastname,
            email:newUser.email
        }
        return res.status(201).json({
            message: "User successfully created",
            user: formatResponse
        })

    } catch (error) {
        // Handle potential database or other errors during creation
        console.error("Registration error:", error);
        return res.status(500).json({ message: "An error occurred during registration" });
    }
})

app.post("/auth/login",async (req:Request,res:Response)=>{

    try {
        const {email,password} = req.body

        const user = await User.findOne({where:{email}})
        if(!user){
            return res.status(401).json({message:"invalid user"})
        }

        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid){
            return res.status(400).json({message:'the password is in correct'})
        }

        const token = jwt.sign({id:user.id},'secret-key',{
            expiresIn:'1h'
        })

        return res.status(200).json({
            message:'login successful',
            token
        })

    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            res.status(500).json({
                error:true,
                message:error.message
            })
            
        }
        console.log(`error occurred at the server`);
           res.status(500).json({
                error:true,
                message:`error`
            })
    }
})

app.listen(port,async ()=>{
    await sequelize.authenticate()
    //await User.sync()
    console.log(`database connected successfully`);
    
    console.log(`listening at ${port}`);
    
})