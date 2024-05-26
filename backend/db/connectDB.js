import mongoose from "mongoose";

const connectMongoDB = async()=>{
    
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log('connected to db');
    } catch (error) {
        console.log('error connecting to db : ',error);
    }
}

export default connectMongoDB