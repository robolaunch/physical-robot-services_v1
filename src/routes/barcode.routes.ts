import barcodeServices from "../services/barcode.services";
import express from "express";

const router = express.Router();

router.get("/", barcodeServices.get);

router.get("/:time", barcodeServices.getWithTime);

router.post("/", barcodeServices.post);

router.delete("/", barcodeServices.remove);

export default router;
