import express from "express";
import { extractWebMetadata } from "../controllers/extractController.js";
const router = express.Router();

router.post("/extract/website", extractWebMetadata);
export default router;