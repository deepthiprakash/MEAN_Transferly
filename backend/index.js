//import dataservice file
const dataservice=require('./service/dataservice')

//import cors
const cors=require('cors')

//import json web token
const jwt=require('jsonwebtoken')

// import express
const express=require("express")

//create app using express
const app=express()

//connection string to frontend integration
app.use(cors({origin:'http://localhost:4200'}))

//to parse json to js
app.use(express.json())

//create port
app.listen(3000,()=>{console.log("server started at port number 3000");})

//create middleware
const jwtMiddleware=(req,res,next)=>{
   try{const token=req.headers['access_token']
   //verify token
   const data=jwt.verify(token,"secret123")
   next()}
   catch{
      res.status(422).json({
         statusCode:422,
         status:false,
         message:'please login first'
      }
      )
   }
}

//request for register
// app.post('/register',(req,res)=>{
//    const result=dataservice.register(req.body.user,req.body.acno,req.body.psw)
//    //convert object to json and sent as response
//    res.status(result.statuscode).json(result)
// })

//request for register
app.post('/register',(req,res)=>{
   dataservice.register(req.body.user,req.body.acno,req.body.psw).then(result=>{
      res.status(result.statuscode).json(result)})
   })



// //request for login
// app.get('/login',(req,res)=>{
//    const result=dataservice.login(req.body.acno,req.body.psw)
// //convert object to json and sent as response
//    res.status(result.statuscode).json(result)
// })

//request for login
app.post('/login',(req,res)=>{
   const result=dataservice.login(req.body.acno,req.body.psw).then(result=>{
   res.status(result.statuscode).json(result) })
})

// //request for deposit
// app.post('/deposit',jwtMiddleware,(req,res)=>{
//    const result=dataservice.deposit(req.body.acno,req.body.psw,req.body.amount)
//    //convert object to json and sent as response
//    res.status(result.statuscode).json(result)
// })

//request for deposit
app.post('/deposit',jwtMiddleware,(req,res)=>{
   dataservice.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
   //convert object to json and sent as response
   res.status(result.statuscode).json(result)})
})

// //request for withdraw
// app.post('/withdraw',jwtMiddleware,(req,res)=>{
//    const result=dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount)
//    //convert object to json and sent as response
//    res.status(result.statuscode).json(result)
// })

//request for withdraw
app.post('/withdraw',jwtMiddleware,(req,res)=>{
   dataservice.withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
   //convert object to json and sent as response
   res.status(result.statuscode).json(result)})
})

// //request for gettransaction
// app.get('/getTransaction',jwtMiddleware,(req,res)=>{
//    const result=dataservice.getTransaction(req.body.acno)
//    //convert object to json and sent as response
//    res.status(result.statuscode).json(result)
// })

//request for gettransaction
app.post('/transaction',jwtMiddleware,(req,res)=>{
   dataservice.getTransaction(req.body.acno).then(result=>{
   //convert object to json and sent as response
   res.status(result.statuscode).json(result)})
})

//delete
app.delete('/delete/:acno',jwtMiddleware,(req,res)=>{
   dataservice.deleteAcc(req.params.acno).then(result=>{
      res.status(result.statuscode).json(result)
   })
})



