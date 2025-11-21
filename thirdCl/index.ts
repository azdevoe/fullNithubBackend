import express,{Request,Response} from 'express'
const port  = 4000
const app = express()
app.use(express.json())


interface Perfume{
    id:number,
    name:string,
    description:string,
    quantity:number,
    size:string
}

interface User{
    id:number,
    name:string,
    email:string,
    phone:string,
    password:string
}

const userDb:User[] = []

const PerfumeDb:Perfume[] = [
    {id:1,name:'perfume1',description:'made in india',quantity:10,size:'10cm'},
    {id:2,name:'perfume2',description:'made in china',quantity:10,size:'10cm'},
    {id:3,name:'perfume3',description:'made in nigeria',quantity:10,size:'10cm'},
    {id:4,name:'perfume4',description:'made in indonesia',quantity:10,size:'10cm'},
    {id:5,name:'perfume5',description:'made in brazil',quantity:10,size:'10cm'},
    {id:6,name:'perfume6',description:'made in qatar',quantity:10,size:'10cm'},
    {id:7,name:'perfume7',description:'made in vietnam',quantity:10,size:'10cm'},
    {id:8,name:'perfume8',description:'made in ghana',quantity:10,size:'10cm'},
    {id:9,name:'perfume9',description:'made in tunisia',quantity:10,size:'10cm'}

]

app.get('/perfumes',(req:Request,res:Response)=>{
    res.json(PerfumeDb)
})

app.post('/users',(req:Request,res:Response)=>{
    const user = req.body
    userDb.push(user)
    res.send('user created')
    console.log(userDb);
    
})

app.delete('/user/:id',(req:Request,res:Response)=>{
    const {id}=req.params
    const pid = Number(id)
    const uu = userDb.findIndex((user)=>{
        return user.id === pid
    })

    if(uu!= -1){
         userDb.splice(uu,1)
        res.send(userDb)  
    }else{
        res.send('the user doesnt exist')
    }
})

app.get("/users",(req:Request,res:Response)=>{
    res.send(userDb)
})
app.get("/user/:id",(req:Request,res:Response)=>{

    const {id} =req.params
    console.log(id);
    const rr = userDb.filter((user)=> user.id === Number(id))
    res.json(rr)
})
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
    
})