import express from 'express'

const app = express()
const port  = 4000


app.get('/',(req,res)=>{
    res.send('<h1>i am vengance</h1>')
})
app.listen(port,()=>{
    console.log(`server runing at ${port}`);
    
})