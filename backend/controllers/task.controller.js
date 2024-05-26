import 'dotenv/config';
import main from './scripts/interact.js';


const transferReward = async (req, res) => {
  const employeeAddress = req.body.employeeAddress;

  

  try {
  
    const txn = await main();
    

    res.status(200).json({
      message: `Successfully transferred  TRT }`,
      txn,
    });

  } catch (error) {
    console.error('Error transferring tokens:', error);
    res.status(500).json({ error: 'Error transferring tokens', message: error.message });
  }
};

export {
  transferReward
};
