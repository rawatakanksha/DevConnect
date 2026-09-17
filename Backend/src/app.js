const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

const cookieParser =require("cookie-parser")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const reqRouter=require("./routes/request")
const userReqRouter=require("./routes/userReq")

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
app.use("/",reqRouter)
app.use("/",userReqRouter)


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


