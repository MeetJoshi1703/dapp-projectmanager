import 'dotenv/config';
import main from './scripts/interact2.cjs';

const inputLog = async(req,res)=>{
    
    const string = req.body.input;
    
try {
    
    await main(string);
    res.status(200).json("hurray");
} catch (error) {
    
}

}

export{
    inputLog,
}