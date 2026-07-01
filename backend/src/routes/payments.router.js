import express from "express";
import multer from "multer";
import { getAllPayments, registerAPayment, updateAPayment, uploadPaymentProof } from "../controllers/payments.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllPayments);
router.post("/insert", registerAPayment);
router.post("/upload", upload.single("file"), uploadPaymentProof);
router.patch("/update/:id", updateAPayment);

export default router;