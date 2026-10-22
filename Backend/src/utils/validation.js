const validator=require("validator");

const validateSignUp=(req)=>{
    const {Lname,fName,emailId,password}=req.body;

    if(!fName){
        throw new Error("Name require")
    }
    else if(!validator.isEmail(emailId)){
    throw new Error("email not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password not strong enough")
    }

}

const validateEditProfile=(req)=>{
    const updateItem=["fName","Lname","age","sex","skills","about","photo"]

    const isUpdateAllowed=Object.keys(req.body).every((item)=>updateItem.includes(item))
   return isUpdateAllowed;

}
module.exports={
    validateSignUp,
    validateEditProfile
}