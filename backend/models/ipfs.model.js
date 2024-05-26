import mongoose from "mongoose";

const ipfsSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true  
    },
    fileName:{
        type:String,
        required:true  
    },
    cid:{
        type:String,
        required:true
    }
},{timestamps:true});

const Ipfs =mongoose.model("Ipfs",ipfsSchema);

export default Ipfs;