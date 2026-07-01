import express from "express";
import { deleteATenant, getAllTenants, insertTenants, updateATenant } from "../controllers/tenants.controller.js";

const router = express.Router();

router.route("").get(getAllTenants);
router.route("/insert").post(insertTenants);
router.route("/delete/:id").delete(deleteATenant);
router.route("/update/:id").patch(updateATenant);

export default router;
