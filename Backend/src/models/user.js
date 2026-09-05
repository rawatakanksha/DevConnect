const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    fName:{
        type:String
    },
    Lname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
});

 module.exports=mongoose.model("User",userSchema)