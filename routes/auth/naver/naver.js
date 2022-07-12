import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js";

const naverRouter = express.Router();
dotenv.config();
const { client_id, client_secret, state, redirect_uri } = process.env;

naverRouter.get("/", (req, res) => {
  let url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
  res.redirect(url);
});

naverRouter.get("/callback", async (req, res) => {
  let code, state, url, data, access_token, refresh_token, id, email, flag;

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
    id = data.data.response.id;
    email = data.data.response.email;
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }

  access_token = jwt.sign({ sub: id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TIME,
  });
  refresh_token = jwt.sign({ sub: id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME,
  });

  try {
    data = await User.findOne({ id, email });
    if (data == null) flag = false;
    else flag = true;

    if (flag) {
      // User already signin
      await User.updateOne(
        { id: data.id, email: data.email },
        { $set: { access_token: access_token, refresh_token: refresh_token } }
      );
    } else {
      // User not signin
      const user = new User({
        id: id,
        email: email,
        access_token: access_token,
        refresh_token: refresh_token,
      });
      await user.save();
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.toString(),
    });
  }

  res.status(200).json({
    success: true,
    access_token: access_token,
    refresh_token: refresh_token,
  });
});

export default naverRouter;
