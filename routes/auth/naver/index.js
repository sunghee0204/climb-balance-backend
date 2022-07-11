import express from "express";
import dotenv from "dotenv";
import axios from "axios";

const naverRouter = express.Router();
dotenv.config();
const { client_id, client_secret, state, redirect_uri } = process.env;

naverRouter.get("/", (req, res) => {
  let url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
  res.redirect(url);
});

naverRouter.get("/callback", async (req, res) => {
  let code, state, url, data, access_token, refresh_token;

  // Get Token
  try {
    code = req.query.code;
    state = req.query.state;
    url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&state=${state}`;
    data = await axios.get(url);
    access_token = data.data.access_token;
    refresh_token = data.data.refresh_token;
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }

  // Get id, email
  try {
    url = `https://openapi.naver.com/v1/nid/me`;
    data = await axios({
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data.data);
    res.send(data.data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }

  // Register User
});

export default naverRouter;
