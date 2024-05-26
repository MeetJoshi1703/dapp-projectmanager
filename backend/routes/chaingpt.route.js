import express from "express";
import { promptBot } from "../controllers/chaingpt.controller.js";

const router = express.Router();

router.post('/',promptBot);

export default router;