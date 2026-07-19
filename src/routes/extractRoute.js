import express from "express";
import { extractWebMetadata, extractDomainMetadata } from "../controllers/extractController.js";
const router = express.Router();

router.post("/extract/website", extractWebMetadata);
router.post("/extract/domain", extractDomainMetadata);
export default router;