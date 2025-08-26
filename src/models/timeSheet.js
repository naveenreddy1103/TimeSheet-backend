const mongoose=require('mongoose')


const timeSheetSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    project:{
        type:String,
        required:true,
        min:4,
        max:400,
        trim:true
    },
    hoursWorked:{
        type:Number,
        required:true,
        min:0,
        max:24
    },
    notes:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports=mongoose.model("TimeSheet",timeSheetSchema)