import express,{Express,Request,Response} from 'express'
const app:Express = express()
const port  = 4000
app.use(express.json())

interface Pro{
    id:number,
    name:string,
    category:string
}
const products:Pro[] =[
    {id:1,name:'product1',category:'electronics'},
    {id:2,name:'bruce',category:'grocery'},
    {id:3,name:'product3',category:'grocery stuff'},
    {id:4,name:'product4',category:'electronics'}

]

app.post('/',(req:Request,res:Response)=>{
    const {name,category}=req.body
    console.log(name,category);
    products.push({id:products.length+1,name:name,category:category})
    res.json(products)
    
})
app.get('/products',(req:Request,res:Response)=>{
    const category =req.query.category as string|undefined
    console.log(category);
    const ii = products.filter((product)=>{
        return product.category === category
    })
    console.log(ii);
    
    
    res.json(ii)
    // res.json({products})
})

app.patch('/product/:id',(req:Request,res:Response)=>{
    let {id} = req.params
    const updated = req.body

    let ii = products.findIndex((product)=>{
        return product.id === parseInt(id)
    })
    if(ii){
        let uu ={...products[ii], ...updated}
        console.log(uu);
        
        products[ii]=uu
       return  res.json(products)
    }
})

app.get('/products/:id',(req:Request,res:Response)=>{
    let {id} = req.params
    
    let Pid=Number(id)

    let uu= products.filter((product)=>{

        return product.id == Pid
    })
    res.json(uu)
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
    
})