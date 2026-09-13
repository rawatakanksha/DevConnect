const mongoose=require("mongoose")

const connectionReqSchema=new mongoose.Schema({
   fromUserId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true
   },
   toUserId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true
   },
   status:{
     type: String,
      required: true,
   enum:{
    values:["ignored","rejected","accepted","interested"],
    message:`{VALUE} is not a status type`
   } 
   }
} ,{
    timestamps:true
})

connectionReqSchema.index({fromUserId:1,toUserId:1})

connectionReqSchema.pre("save",function(next){
const connectionReq=this;
if(connectionReq.fromUserId.equals(this.toUserId)){
    throw new Error("Can not send reuest to yourself")
}
next()
})

const connectionReqModel=new mongoose.model("ConnectionReq",connectionReqSchema);
module.exports=connectionReqModel;