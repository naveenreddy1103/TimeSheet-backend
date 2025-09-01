const mongoose=require('mongoose')
const validator=require('validator')


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:25
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:["Software Developer","Data Analyst"],
            message:`{VALUE} Incorrect Role`
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email issue")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password issue")
            }
        }
    }
},{timestamps:true})

module.exports=mongoose.model('User',userSchema)