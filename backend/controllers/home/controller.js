const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const getHome = (req, res) => {
     res.send('Welcome to the FGCU SE Chatbot');
};

const postChatbot = async (req, res) => {

     const { userMessage } = req.body;

     const options = {
          method: 'POST',
          url: 'https://custom-chatbot-api.p.rapidapi.com/chatbotapi',
          headers: {
               'x-rapidapi-key': 'ff762d5a2fmsh06af197dc30343dp1fe482jsn3354cefce363',
               'x-rapidapi-host': 'custom-chatbot-api.p.rapidapi.com',
               'Content-Type': 'application/json'
          },
          data: {
               bot_id: 'OEXJ8qFp5E5AwRwymfPts90vrHnmr8yZgNE171101852010w2S0bCtN3THp448W7kDSfyTf3OpW5TUVefz',
               messages: [
                    {
                         role: 'user',
                         content: userMessage
                    }
               ],
               user_id: '',
               temperature: 0.9,
               top_k: 5,
               top_p: 0.9,
               max_tokens: 256,
               model: 'gpt 3.5'
          }
     };

     try {
          const response = await axios.request(options);
          res.json({
               advice: response.data, // Send the API response back to the client
          });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch chatbot message' });
     }


};

module.exports = {
     getHome,
     postChatbot,
};
