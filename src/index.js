const express=require('express')
const app=express()
const cors=require('cors')
const dotenv=require('dotenv').config()
const PORT=process.env.PORT || 1000
const cookieParser=require('cookie-parser')
app.use(cors());

app.use(cookieParser())

const dbConnect=require('./config/databaseConfig')
const authRouter=require('./router/auth')
const timeSheetRouter=require('./router/timeSheet')

app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use('/',authRouter)
app.use('/',timeSheetRouter)


dbConnect().then(()=>{
    app.listen(PORT,()=>{
    console.log("db connected")
    console.log(`http://127.0.0.1:${PORT}`)
})
})
.catch(error=>{
    console.log(error.message)
})

