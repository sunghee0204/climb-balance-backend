import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

// import router
import userRouter from "./routes/user/user.js";
import naverRouter from "./routes/auth/naver/naver.js";
import tokenRouter from "./routes/auth/token/token.js";

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
dotenv.config();

app.use("/user", userRouter);
app.use("/token", tokenRouter);
app.use("/auth/naver", naverRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to mongodb"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server is running ${process.env.PORT} port 🚀`)
);
