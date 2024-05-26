import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import ipfsRoutes from './routes/ipfs.route.js'
import chaingptRoutes from './routes/chaingpt.route.js'
import taskRoutes from './routes/task.route.js'
import logRoutes from './routes/log.route.js'
import connectMongoDB from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
app.use('/api/ipfs',ipfsRoutes);
app.use('/api/chaingpt',chaingptRoutes);
app.use('/api/transfer',taskRoutes);
app.use('/api/logs',logRoutes);


    


app.listen(PORT,()=>{
    connectMongoDB();
    console.log(`server running on port ${PORT}`)
});