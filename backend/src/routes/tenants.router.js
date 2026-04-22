import express from "express";
import { deleteATenant, getAllTenants, insertTenants } from "../controllers/tenants.controller.js";

const router = express.Router();

router.route("/").get(getAllTenants);
router.route("/insert").post(insertTenants);
router.route("/delete/:name").delete(deleteATenant);

export default router;
