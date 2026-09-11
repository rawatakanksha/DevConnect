const jwt=require('jsonwebtoken')
const User=require("../models/user")
const authUser=async(req,res,next)=>{
try{
    const {token}=req.cookies;
    const decoded=await jwt.verify(token,"DevConnect@123");
    const {_id}=decoded
    const user = await User.findById(_id);

    if(!user){
        throw new Error("Invalid User")
    }
    req.user=user;
    next();
}
catch(err){
 res.status(404).send("tokens not invalidated")
}  
};

module.exports={
    authUser
}