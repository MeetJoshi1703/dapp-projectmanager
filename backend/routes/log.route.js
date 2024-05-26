import { inputLog } from "../controllers/log.controller.js";
import express from 'express';


const router = express.Router();

router.post('/',inputLog);

export default router;