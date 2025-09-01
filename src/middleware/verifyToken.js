const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const User=require('../models/user')
const Admin=require('../models/adminUser')

const userVerifyToken=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.header('token') 
        // console.log(token)
        if(!token){
            throw new Error("token not found")
        }
        const tokenVerify=await jwt.verify(token,process.env.KEY)
        // console.log(tokenVerify)
        const userData=await User.findById(tokenVerify._id)
        // console.log(userData)
        req.user=userData
        next()
    }
    catch(error){
        res.json({
            message:error.message,
            problem:"while generating token"
        })
    }
}

const adminVerifyToken=async(req,res,next)=>{
    try{
        const adminToken= req.cookies.adminToken || req.header('adminToken');
        if(!adminToken){
            throw new Error("token not found")
        }
        const tokenVerify=await jwt.verify(adminToken,process.env.KEY)
        const adminData=await Admin.findById(tokenVerify._id)
        if(!adminData){
            throw new Error("admin not found")
        }
        req.user=adminData
        next()

    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}
module.exports={userVerifyToken,adminVerifyToken}