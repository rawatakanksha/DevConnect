const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

const cookieParser =require("cookie-parser")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")

// app.use('/admin',authAdmin,(req,res)=>{
//     res.send('welcome admin')
// })
// app.use('/user',authUser)
// app.use('/user/login',(req,res)=>{
//   res.send('login user')
// })

// app.use('/admin',(req,res,next)=>{
//    const token='xyz'
//    const isAdmin= token=== 'xyz';

//    if(!isAdmin){
//     res.status(401).send("not an admin")
//    }
//    else{
//     next()
//    }
// })

// app.get('/admin/getAlldata',authAdmin)
// app.get('/admin/delete',(req,res)=>{
//     res.send("all user delete ")
// })

// app.use('/',(err,req,res,next)=>{
//     if(erroe){
//     res.status(500).send('somthing went wrong')
//     }

// })

// middlewares
app.use(express.json());
app.use(cookieParser())


app.use("/",authRouter)
app.use("/",profileRouter)



// get multiple users by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (!user) {
      res.status(404).send("cant fetch");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("errorr searching", err);
  }
});

// get single user by email
app.get("/users", async (req, res) => {
  try {
    const userEmail=req.body.emailId;
    const users = await User.findOne({emailId:userEmail});

    if (users.length === 0) {
      res.status(404).send("cant fetch");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("can't fetch users", err);
  }
});

// Feed API -get all the users from database
app.get("/feed", async(req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(404).send("error fetching users",err)
    }
})

// delete api
app.delete("/users",async(req,res)=>{
    const userId=req.body.userId
    try{
        // const user=await User.findOneAndDelete({_id:userID}) have a shorthand property findByIdAndDelete
        const users= await User.findByIdAndDelete(userId);
        if(!users){
            res.status(404).send("User not found")
        }
        else{
        res.send("user deleted sucessfully")
        }
    }
    catch(err){
       res.status(404).send("error deleting",err)
    }
})

app.patch("/users/:usersId",async(req,res)=>{
    const userId= req.params?.userId
    const data=req.body
     try{ 
        // API LEVEL validation for updating data
        const ALLOWED_UPDATES=["fName","sex","age","password","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update not allowed")
        }
        if(data?.skills.length>20){
            throw new Error("skill cannot be more than 20")
        }

       const user=await User.findOneAndUpdate({_id:userId},data, { runValidators: true })
       res.send("updated")
    }
    catch(err){
       res.status(404).send("error updating: "+err.message)
    }
})






connectDb()
  .then(() => {
    console.log("db connected sucessfully");
    app.listen(3000, () => {
      console.log("serever connectd to 3000");
    });
  })
  .catch((err) => {
    console.log("db not connected ", err);
  });


