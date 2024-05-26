import express from 'express';

import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';

const app = express();

app.use(express.json());
let hashMap = new Map();
// const createHelia = require('helia')
async function createNode() {
    const helia = await createHelia();
    const fs = unixfs(helia);
    return fs;
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const uploadFile = async (req, res) => {
    try {
        const fs = await createNode();
        const files = req.files;
        const cids = [];

        for (const file of files) {
            const data = file.buffer;
            const cid = await fs.addBytes(data);
            hashMap.set(file.originalname, cid.toString());
            cids.push({ filename: file.originalname, cid: cid.toString() });
        }

        res.status(201).send(cids);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading the files');
    }
};

const getAllFiles = (req,res)=>{
    const files = Array.from(hashMap.entries()).map(([filename, cid]) => ({ filename, cid }));
    res.status(200).json(files);
}

const downloadFile = async (req, res) => {
    try {
      const filename = req.params.filename;
      const cid = hashMap.get(filename);
  
      if (!cid) {
        return res.status(404).json({ error: 'File not found' }); // Use JSON for structured response
      }
  
      const fs = await createNode();
      const decoder = new TextDecoder();
      let fileData = '';
  
      for await (const chunk of fs.cat(cid)) {
        fileData += decoder.decode(chunk, { stream: true });
      }
  
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`); // Use template literals for cleaner string construction
      res.send(fileData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the file' }); // Use JSON for structured response
    }
  };
  

export{
    uploadFile,
    getAllFiles,
    downloadFile
}