const express=require("express")
const profileRouter=express.Router()
const {authUser}=require("../middlewares/auth")
const {validateEditProfile}=require("../utils/validation")
const User=require("../models/user")


profileRouter.get("/profile/view",authUser,async(req,res)=>{
    try{
  const user= req.user
   res.send(user)
    }
    catch(err){
        res.status(404).send("Login not validatated")
    }
})

profileRouter.patch("/profile/edit",authUser,async(req,res)=>{
  try {
    
    if(!validateEditProfile(req)){
    throw new Error("Invalid Edit Req")
  }

  const loggedUser=req.user
   Object.keys(req.body).forEach((key)=>loggedUser[key]= req.body[key])
   res.json({
    message:`${loggedUser.fName},your profile is updated`,
    data:loggedUser
   })
   await loggedUser.save()  

}
  catch(err){
    res.status(400).send("error editing"+err.message)
  }
})

profileRouter.patch("/profile/password",authUser,async(req,res)=>{
 try{
   const{currentPassword,newPassword}=req.body
   const loggedUser=req.body

   if(!currentPassword||!newPassword){
    throw new Error("Please provide both password")
   }
   
   const isCurrentPassValid= await loggedUser.validatePassword(currentPassword)
     if(!isCurrentPassValid){
      throw new Error("Password Incorrect")
    }

   if(!validator.isStrongPassword(newPassword)){
     throw new Error("password not strong")
   }

   const newPasswordHash=await bcrypt.hash(newPassword,10)
   loggedUser.password=newPasswordHash
   await loggedUser.save()

     res.status(200).send("Password changed successfully!");
  }
  catch(err){
      res.status(200).send("Password changed successfully!");
  }
})





module.exports=profileRouter