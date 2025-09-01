const mongoose=require('mongoose');
const dotenv=require('dotenv').config

const dbConnect=async()=>{
    await mongoose.connect("mongodb+srv://Nodejs:Nodejs@cluster0.r72zfn1.mongodb.net/TimeStamp")
}

module.exports=dbConnect