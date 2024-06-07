import { GeneralChat, Errors } from '@chaingpt/generalchat';

const API_KEY = 'bc47184d-6bdb-49a9-ab25-21fa9015227f'; 

const generalchat = new GeneralChat({
  apiKey: API_KEY,
});

async function sendPromptToApi(userPrompt) {
  try {
    const stream = await generalchat.createChatStream({
      question: userPrompt,
      chatHistory: 'off',
    });

    let responseData = '';

    stream.on('data', (chunk) => {
      responseData += chunk.toString();
    });

    return new Promise((resolve, reject) => {
      stream.on('end', () => {
        console.log('Stream ended');
        resolve(responseData);
      });

      stream.on('error', (error) => {
        console.error('Stream error:', error);
        reject(error);
      });
    });
  } catch (error) {
    if (error instanceof Errors.GeneralChatError) {
      console.log(error.message);
      throw error; 
    } else {
      console.error('Unexpected error:', error);
      throw error; 
    }
  }
}

const promptBot = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing prompt text in request body' });
    }

    const processedText = await sendPromptToApi(text);
    res.json({ processedText });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal server error' }); 
  }
};

export { promptBot };
