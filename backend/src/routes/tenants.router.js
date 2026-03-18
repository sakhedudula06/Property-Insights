import express from "express";
import { getAllTenants, insertTenants } from "../controllers/tenants.controller.js";

const router = express.Router();

router.route("/tenants").get(getAllTenants);
router.route("/insert").post(insertTenants);

export default router;
