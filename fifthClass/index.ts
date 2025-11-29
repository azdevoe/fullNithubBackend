import express,{Request,Response,NextFunction,Express} from 'express'
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

app.listen(port,()=>{
    console.log(`listening at ${port}`);
    
})