const express=require("express")
const authRouter=express.Router();

const {validateSignUp}=require("../utils/validation")
const bcrypt=require("bcrypt")
const User=require("../models/user")


authRouter.post("/signup", async (req, res) => {
  // saving data
  try {
    // STEP 1 - VALIDATION
     validateSignUp(req)

    //  STEP 2 - ENCRYPT PASSWORD
    const {password,fName,Lname,emailId,age}=req.body
    const passwordHash=await bcrypt.hash(password,10)
    console.log(passwordHash)

    // STEP 3 - CREATING A NEW INSTANCE OF THE USER MODEL
    const user=new User({
        fName,
        Lname,
        emailId,
        password: passwordHash,
        age
    })
   
    await user.save();
    res.send("User Added Sucessfully");
  } catch (err) {
    res.status(400).send("error saving user:"+ err.message);
  }
});

authRouter.post("/login",async(req,res)=>{

    try{
     const {emailId,password}=req.body
         const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("Invalid Credentials")
        }
        // const isPassword= await bcrypt.compare(password,user.password)   --->without mongoose scheema

                const isPassword= await user.validatePassword(password)
            if(isPassword){
            // create a JWT Token
            // const token=await jwt.sign({_id:user._id},"DevConnect@123",{expiresIn:'7d'})  ----> without mongoose schema in api 
            // USING MONGOOSE SCHEMA
               const token= await user.getJWT()   
            
            // Add Token to cookie and send the response back to user
               res.cookie("token",token)

                res.send(user)
        }
        else{
               throw new Error("Invalid Credentials")
        }
   
    }
    catch(err){
        res.status(404).send("Error loging in:"+err.message)
    }
})

authRouter.post("/logout",async(req,res)=>{

   res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("User logged out")
})





module.exports= authRouter