import User from "./model/User.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const router = express.Router();
const { PORT, MONGO_URL, client_id, client_secret, state, redirectURI } =
  process.env;
let api_url = "";
app.get("/", (req, res) => {
  res.send("Hi Hi :D");
});

app.get("/naverlogin", function (req, res) {
  api_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
    client_id +
    "&redirect_uri=" +
    redirectURI +
    "&state=" +
    state;
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end(
    "<a href='" +
      api_url +
      "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
  );
});

app.get("/callback", function (req, res) {
  code = req.query.code;
  state = req.query.state;
  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&redirect_uri=" +
    redirectURI +
    "&code=" +
    code +
    "&state=" +
    state;
  var request = require("request");
  var options = {
    url: api_url,
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(PORT, () => console.log(`${PORT} port open!`));

mongoose
  .connect(MONGO_URL, {
    // useNewUrlPaser: true,
    // useUnifiedTofology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB conected");
    // const user = new User({
    //   nickname: "abc",
    //   email: "abc@naver.com",
    //   sex: "man",
    //   height: 180.5,
    //   weight: 90.8,
    //   marketing: true,
    //   navertoken: "naver!!",
    // });
    // user.save();
  })
  .catch((err) => {
    console.log(err);
  });
