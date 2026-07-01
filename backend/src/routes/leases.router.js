import express from "express";
import multer from "multer";

import { getAllLeases, createALease, uploadALease } from "../controllers/leases.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', getAllLeases);
router.post('/create', createALease);
router.post("/upload", upload.single("file"), uploadALease);


export default router;