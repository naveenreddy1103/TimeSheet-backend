const mongoose=require('mongoose');
const dotenv=require('dotenv').config

const dbConnect=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
}

module.exports=dbConnect