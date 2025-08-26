

const validateFeilds=(userData,requiredFeild)=>{
   const isVaild= Object.keys(userData).every(data=>requiredFeild.includes(data))
        if(!isVaild){
            throw new Error("Check feilds")
        }
        return true
}
module.exports={
    validateFeilds
}