import express from "express";
import { createUser,  loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/signin").post(loginUser);

export default router;