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
module.exports={
    validateSignUp
}