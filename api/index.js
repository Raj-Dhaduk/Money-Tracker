const express= require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()
const transactionModels=require('./models/transaction')
const { default: mongoose } = require('mongoose')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/api/test',(req,res)=>{
    res.json('ok test')
})
const MongoURL = process.env.MONGO_URL
mongoose.connect(MongoURL);
app.post('/api/transaction',async(req,res)=>{
  

   const {name,description,datetime,price}=req.body

   const transa= await transactionModels.create({name,description,datetime,price})


    res.json(transa)
})

app.get('/api/moneydata', async (req, res) => { 
 try {
   const datamoney = await transactionModels.find();
   res.json(datamoney);
 } catch (error) {
   console.log({ error: "the data is not found" });
   res.json(error)
 }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});  
