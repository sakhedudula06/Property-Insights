import express from "express";

import { getAllProperties, insertAProperty, updateAProperty, deleteAProperty } from "../controllers/properties.controller.js";

const router = express.Router();

router.route("").get(getAllProperties);
router.route("/insert").post(insertAProperty);
router.route("/update/:id").patch(updateAProperty);
router.route("/delete/:id").delete(deleteAProperty);

export default router;