import multer from 'multer';
import express from "express";
import { uploadFile,getAllFiles,downloadFile } from "../controllers/ipfs.controller.js";
const upload = multer();

const router = express.Router();

router.post('/',upload.array('recfiles'),uploadFile).get('/',getAllFiles).get('/:filename',downloadFile);

export default router;