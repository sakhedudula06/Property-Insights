import express from "express";
import { getAllTenants, insertTenants } from "../controllers/tenants.controller.js";

const router = express.Router();

router.get("/", getAllTenants);
router.post("/", insertTenants);

export default router;
