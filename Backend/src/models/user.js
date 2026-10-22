const mongoose=require('mongoose')
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    Lname:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid id:" + value)
         }
        }

    },
    password:{
        type:String,
        required:true,      
        // HARD CODED VALIDATION
        // validate:[
        //     {
        //         validator:function(password){
        //             return password.length>=8
        //         },
        //         message:"password must be at least 8 char long"
        //     },
        //     {
        //         validator:function(password){
        //              const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/;
        //              return passwordRegex.test(password)
        //         },
        //         message:"Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&#)",
        //     }
        // ] 

        // VALIDATION USING VALIDATOR LIB
        validate(value){
            if( !validator.isStrongPassword(value)){
                
            }
        }
    },
    age:{
        type:Number,
        required:true,
        min:[18,"Minors can not login"],
        // default:18
    },
    sex:{
        type:String,
        enum:{
             values:["female","male","others"],
            message:"gender not found"
        },
        lowercase:true  
    },
    skills:{
        type:[String]
    },
    about:{
        type:String,
        default:'This is default about'
    },
    photo:{
        type: String,
    default: "https://geographyandyou.com/images/user-profile.png",
    }
},{
    timestamps:true
});
 
userSchema.methods.getJWT=async function(){
    const user=this;

    const token=await jwt.sign({_id:user.id},"DevConnect@123",{expiresIn:"7d"})
    return token;
}

userSchema.methods.validatePassword=async function(userInputPassword){
  const passwordHash=this.password;
  const isPasswordValidate=await bcrypt.compare(userInputPassword,passwordHash)
  return isPasswordValidate
}


 module.exports=mongoose.model("User",userSchema)