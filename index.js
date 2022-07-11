import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// import router
import globalRouter from "./routes/global/index.js";
import naverRouter from "./routes/auth/naver/index.js";

const app = express();

//middleware
app.use(helmet());
// app.use(morgan("dev"));
dotenv.config();

app.use("/", globalRouter);
app.use("/auth/naver", naverRouter);

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server is running ${process.env.PORT} port 🚀`)
);
