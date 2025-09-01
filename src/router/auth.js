const User=require('../models/user')
const express=require('express')
const authRouter=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {validateFeilds}=require('../utils/feildValidation')
const dotenv=require('dotenv').config()
const KEY=process.env.KEY
const {userVerifyToken, adminVerifyToken}=require('../middleware/verifyToken')
const AdminUser=require('../models/adminUser')


// user sigin route
authRouter.post('/user/signup',async(req,res)=>{
    try{
        const userData=req.body
        const requiredFeild=["userName","email","password","role"]
        validateFeilds(userData,requiredFeild)
        const {userName,role,email,password}=req.body
        const passwordHash=await bcrypt.hash(password,10)
        const newUser=new User({
            userName:userName,role:role,email:email,
            password:passwordHash
        });
        await newUser.save()
        res.json({
            message:`${userName} added successfully`
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// user login route
authRouter.post('/user/login',async(req,res)=>{
    try{
        const userData=req.body
        const requiredFeild=["email","password"]
        validateFeilds(userData,requiredFeild)
        const {email,password}=req.body
        const userSchemaData=await User.findOne({email:email})
        // console.log(userSchemaData)
        if(!userSchemaData){
             throw new Error("invaild creditainls e")
        }
         const compareHashedPassword=await bcrypt.compare(password,userSchemaData.password)
         if(!compareHashedPassword){
             throw new Error("invaild creditainls p")
        }
        const token=await jwt.sign({_id:userSchemaData._id},KEY,{expiresIn:'7d'})
        res.cookie('token',token,{
             httpOnly: true,
             secure: false,
             sameSite: 'Lax',
             maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        res.json({
            message:`${userSchemaData.userName} logged successfully`,
            token:token,
            id:userSchemaData._id,
            userName:userSchemaData.userName
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// user logout route
authRouter.get('/user/logout',userVerifyToken,async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
})



//admin signup
authRouter.post('/admin/signup',async(req,res)=>{
    try{
        const userData=req.body
        const requiredFeild=["userName","email","password"]
        validateFeilds(userData,requiredFeild)
        const {userName,email,password}=req.body
        const passwordHash=await bcrypt.hash(password,10)
        const newUser=new AdminUser({
            userName:userName,email:email,
            password:passwordHash
        });
        await newUser.save()
        res.json({
            message:`${userName} Admin added successfully`
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

//admin login
authRouter.post('/admin/login',async(req,res)=>{
    try{
        const userData=req.body
        const requiredFeild=["email","password"]
        validateFeilds(userData,requiredFeild)
        const {email,password}=req.body
        const userSchemaData=await AdminUser.findOne({email:email})
        // console.log(userSchemaData)
        if(!userSchemaData){
             throw new Error("invaild creditainls e")
        }
         const compareHashedPassword=await bcrypt.compare(password,userSchemaData.password)
         if(!compareHashedPassword){
             throw new Error("invaild creditainls p")
        }
        const adminToken=await jwt.sign({_id:userSchemaData._id},KEY,{expiresIn:'7d'})
        res.cookie('adminToken',adminToken,{
             httpOnly: true,
             secure: false,
             sameSite: 'Lax',
             maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
        })
        res.json({
            message:`${userSchemaData.userName} logged successfully`,
            adminToken:adminToken,
            id:userSchemaData._id,
            userName:userSchemaData.userName
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// get all users
authRouter.get('/admin/all/user',adminVerifyToken,async(req,res)=>{
    try{
        const users=await User.find().select("userName role _id")
        res.status(200).json({
            message:users
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
})


module.exports=authRouter