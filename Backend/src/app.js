const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const reqRouter = require("./routes/request");
const userReqRouter = require("./routes/userReq");

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", reqRouter);
app.use("/", userReqRouter);

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
