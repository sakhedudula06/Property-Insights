import express from "express";
import { createUser,  loginUser, updateUser, passwordReset, logout } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/signin").post(loginUser);
router.route("/signout").post(logout);
router.route("/update").put(updateUser);
router.route("/passwordreset").post(passwordReset);

export default router;