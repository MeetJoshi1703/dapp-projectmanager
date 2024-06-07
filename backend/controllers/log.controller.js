import 'dotenv/config';
import main from './scripts/interact2.cjs';

const inputLog = async (req, res) => {
    const string = req.body.input;
    try {
        const result = await main(string);
        // Send the result to the frontend
        res.status(200).json(result);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
}

export {
    inputLog,
}
