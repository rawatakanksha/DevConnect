const express = require("express");
const ConnectionReq = require("../models/connectionRequest");
const reqRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const User = require("../models/user");
const user = require("../models/user");

reqRouter.post("/request/send/:status/:userId", authUser, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const isAllowedStatus = ["ignored", "interested"];
    if (!isAllowedStatus.includes(status)) {
      return res.status(400).send("status invalid " + status);
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User does not exist" });
    };

    const existingReq=await ConnectionReq.findOne({
        $or:[
            {fromUserId,toUserId},
            {toUserId:fromUserId,fromUserId:toUserId}
        ]       
    });
    if(existingReq){
        return res.status(400).send("Request exists")
    }
 
    const connectionRequest = new ConnectionReq({
      fromUserId,
      toUserId,
      status,
    });
    const connectionData = await connectionRequest.save();

    res.json({message: 'Request- '+ status,
        connectionData
    });
  } catch (err) {
    res.status(404).send("error connecting" + err.message);
  }
});

reqRouter.post("/request/review/:status/:reqId",authUser,async(req,res)=>{
try{
    const{status,reqId}=req.params;
    const loggedUser=req.user;

    const allowedStatus=["accepted","rejected"]
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Status Not ALLOWES"})
    }

    const connectionReq=await ConnectionReq.findOne({
        _id:reqId,
        status:"interested",
        toUserId:loggedUser._id
    });

    if(!connectionReq){
       return res.status(400).json({message:"Connection req not found"})
    }
    connectionReq.status=status;
    const reqData=connectionReq.save();
    res.json({
        message:"connection req accepted",
        reqData
    })
}
catch(err){
    res.status(404).send("Connection failed "+err.message )
}




})
module.exports = reqRouter;
