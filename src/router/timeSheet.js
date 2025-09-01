const express=require('express')
const timeSheetRouter=express.Router()
const TimeSheet=require('../models/timeSheet')
const {userVerifyToken,adminVerifyToken}=require('../middleware/verifyToken')
const {validateFeilds}=require('../utils/feildValidation')

// creating new time sheet
timeSheetRouter.post('/timesheet/create',userVerifyToken,async(req,res)=>{
    try{
        const timeSheetData=req.body
        const requiredFeilds=["userId","date","project","hoursWorked","notes"]
        validateFeilds(timeSheetData,requiredFeilds)   //validate feilds
        const {date,project,hoursWorked,notes}=req.body
        //new instances for db
        const newTimeSheet=new TimeSheet({
            userId:req.user._id,
            date:date,project:project,hoursWorked:hoursWorked,notes:notes
        })
        await newTimeSheet.save()
        res.json({
            message:"new Sheet created"
        })

    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// edit time sheet

timeSheetRouter.patch('/timesheet/edit/:id',userVerifyToken,async(req,res)=>{
    try{
        const timeSheetId=req.params.id
        const requiredFeild=["project","hoursWorked","notes"]
        const timeSheetData=req.body
        validateFeilds(timeSheetData,requiredFeild);  // validate feilds
        const editTimeSheet=await TimeSheet.findByIdAndUpdate(timeSheetId,timeSheetData)
        if(!editTimeSheet){
            throw new Error("check edit timeStamp")
        }
        res.json({
            message:"time stamp edited successfully"
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// delete  time sheet
timeSheetRouter.delete('/timesheet/delete/:id',userVerifyToken,async(req,res)=>{
    try{
        const timeSheetId=req.params.id
       
        const deleteTimeSheet=await TimeSheet.findByIdAndDelete(timeSheetId)
        if(!deleteTimeSheet){
            throw new Error("not deleted timestamp card")
        }
        res.json({
            message:"time stamp deleted successfully"
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})



// getting sheet based on userId
timeSheetRouter.get('/user/all/timesheet',userVerifyToken,async(req,res)=>{
    try{
        const userId=req.user
        const timeSheetData=await TimeSheet.find({userId:userId._id})
        .select("date project hoursWorked notes")
        // const data={
        //     date:timeSheetData.date,
        //     project:timeSheetData.project,
        //     hoursWorked:timeSheetData.hoursWorked,
        //     notes:timeSheetData.notes
        // }
        res.json({
            data:timeSheetData
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})

// getting sheet based on userId
timeSheetRouter.get('/admin/timesheet/:id',adminVerifyToken,async(req,res)=>{
    try{
        const userId=req.params.id
        const timeSheetData=await TimeSheet.find({userId:userId})
        .select("date project hoursWorked notes")
        res.json({
            data:timeSheetData
        })
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})


module.exports=timeSheetRouter