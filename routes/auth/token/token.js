import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../../models/User.js";

const tokenRouter = express.Router();
dotenv.config();

tokenRouter.get("/", async (req, res) => {
  let access_token;
  let refresh_token = req.query.refresh_token;

  if (refresh_token === null)
    return res.status(401).json({ status: false, message: "Invalid request." });

  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    await User.findOne({ id: decoded.sub })
      .then((data) => {
        if (data.refresh_token === refresh_token) {
          access_token = jwt.sign(
            { sub: decoded.sub },
            process.env.JWT_ACCESS_SECRET,
            {
              expiresIn: process.env.JWT_ACCESS_TIME,
            }
          );
        }
      })
      .catch((err) =>
        res.status(200).json({
          success: false,
          err,
        })
      );
    await User.updateOne({ id: decoded.sub }, { access_token: access_token });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Your session is not valid.",
      data: error,
    });
  }
  res.status(200).json({
    success: true,
    access_token: access_token,
    refresh_token: refresh_token,
  });
});

export default tokenRouter;
