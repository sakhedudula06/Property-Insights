import express from "express";

import { getAllProperties } from "../controllers/properties.controller.js";

const router = express.Router();

router.route("").get(getAllProperties);

export default router;