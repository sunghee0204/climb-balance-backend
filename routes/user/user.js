import express from "express";
import User from "../../models/User.js";
import verfiyToken from "../../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/", verfiyToken, async (req, res) => {
  await User.find({ id: req.userData.sub })
    .then((data) => res.status(200).json({ success: true, data }))
    .catch((err) => res.status(201).json({ success: false, err }));
});

export default userRouter;
