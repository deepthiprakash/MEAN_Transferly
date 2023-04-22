//import mongoose 
const mongoose=require("mongoose")

//state a connection string to integrate
mongoose.connect('mongodb://127.0.0.1:27017/bankserver',{useNewUrlParser:true})

//model or scheme creation
const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}