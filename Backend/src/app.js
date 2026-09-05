const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

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

app.use(express.json());

app.post("/signup", async (req, res) => {
  // dynamically adding data
  const user = new User(req.body);

  // creating a new instance of user model(statically)
  // const user=new User({
  //     // passing data
  //     fName:'Akanksha',
  //     Lname:'Rawat',
  //     emailId:'akanksha@gmail.com',
  //     password:'helllo@123'
  // });
  // saving data
  try {
    await user.save();
    res.send("User Added Sucessfully");
  } catch (err) {
    res.status(400).send("error saving user:", err.message);
  }
});

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

app.patch("/users",async(req,res)=>{
    const userId= req.body.userId
    const data=req.body
     try{
       const user=await User.findOneAndUpdate({_id:userId},data)
       res.send("updated")
    }
    catch(err){
       res.status(404).send("error updating")
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

// connectDb()
//     .then(() => {
//         console.log("Database connected successfully");
//         app.listen(3000,()=>{
//         console.log("port workink fine on 3000")
// })

//     })
//     .catch((err) => {
//         console.error("Database connection error details:", err); // <-- Look closely at what prints here
//     });
