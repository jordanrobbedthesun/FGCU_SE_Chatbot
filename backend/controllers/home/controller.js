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
               'x-rapidapi-key': process.env.RAPIDAPI_KEY,
               'x-rapidapi-host': process.env.RAPIDAPI_HOST,
               'Content-Type': 'application/json'
          },
          data: {
               bot_id: process.env.BOT_ID,
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
