const express = require("express");
const userReqRouter = express.Router();
const ConnectionReq = require("../models/connectionRequest");
const { authUser } = require("../middlewares/auth");
const User = require("../models/user");

const USER_SAFE_DATA = "fName Lname age sex skills about photo";
userReqRouter.get("/user/requests/recieved", authUser, async (req, res) => {
  try {
    const loggedUser = req.user;

    const reqRecieved = await ConnectionReq.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", ["fName", "Lname", "age", "sex", "skills"]);

    res.json({ mesage: "Recieved Requests", reqRecieved });
  } catch (err) {
    res.status(400).send("Error Fetching Req " + err.message);
  }
});

userReqRouter.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedUser = req.user;
    const findConnection = await ConnectionReq.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const connectionData = findConnection.map((row) => {
      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "Matched Connections",
      connectionData,
    });
  } catch (err) {
    res.status(400).send("Connections Not Found! " + err.message);
  }
});

userReqRouter.get("/feed", authUser, async (req, res) => {
  try {
    const loggedUser = req.user;
    const page=req.query.page
    let limit=req.query.limit;
    limit > 50 ? 50:limit;
    const skip=(page-1)*limit;
    

    const connectedUser = await ConnectionReq.find({
      $or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
    }).select("fromUserId toUserId");

    const hideUser = new Set();
    connectedUser.forEach((req) => {
      return (
        hideUser.add(req.fromUserId.toString()),
        hideUser.add(req.toUserId.toString())
      );
    });

    const users=await User.find({
        $and:[
            {_id:{$nin: Array.from(hideUser)}},
            {_id:{$ne: loggedUser._id}}
        ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit)
    res.send(users);
  } catch (err) {
    res.send("error fetching " + err.message);
  }
});
module.exports = userReqRouter;
