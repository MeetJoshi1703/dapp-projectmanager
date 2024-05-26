import express from "express";
import { transferReward } from "../controllers/task.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/",protectRoute,transferReward);


export default router;