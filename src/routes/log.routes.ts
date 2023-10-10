import taskLogServices from "../services/log.services";
import express from "express";

const router = express.Router();

router.get("/task", taskLogServices.task);

router.get("/task/:time", taskLogServices.taskAfterTime);

router.get("/barcode", taskLogServices.barcode);

router.get("/barcode/:time", taskLogServices.barcodeAfterTime);

export default router;
