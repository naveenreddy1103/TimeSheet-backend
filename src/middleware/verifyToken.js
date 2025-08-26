const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const User=require('../models/user')

const verifyToken=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.header('token') || req.header('adminToken')||req.cookies.adminToken
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
module.exports=verifyToken