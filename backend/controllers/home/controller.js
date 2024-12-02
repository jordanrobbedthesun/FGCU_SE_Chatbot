const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser'); // To parse the CSV files

// Load environment variables
dotenv.config();

// In-memory data storage (you can use a database in production)
let fgcuData = [];

// Function to load and parse CSV files
const loadCSVData = () => {
     return new Promise((resolve, reject) => {
          const data = [];
          fs.createReadStream('../backend/csv/schedule_data.csv') // Assuming the CSV file is in the same directory
               .pipe(csv())
               .on('data', (row) => {
                    data.push(row);
               })
               .on('end', () => {
                    fgcuData = data;  // Store CSV data in the array
                    console.log('FGCU data loaded successfully.');
                    resolve();
               })
               .on('error', (err) => {
                    reject(err);
               });
     });
};

// Function to handle the home route
const getHome = (req, res) => {
     res.send('Welcome to the FGCU SE Chatbot');
};

// Function to handle chatbot messages
const postChatbot = async (req, res) => {
     const { userMessage } = req.body;

     // Ensure the CSV data is loaded before processing messages
     if (fgcuData.length === 0) {
          return res.status(500).json({ error: 'FGCU data is still loading, please try again later.' });
     }

     // Initialize response message
     let responseMessage = "I couldn't understand your request. Can you please clarify?";

          // If not a class query, fallback to using the chatbot API
          const options = {
               method: 'POST',
               url: 'https://custom-chatbot-api.p.rapidapi.com/chatbotapi',
               headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
                    'Content-Type': 'application/json',
               },
               data: {
                    bot_id: process.env.BOT_ID,
                    messages: [
                         {
                              role: 'user',
                              content: userMessage,
                         },
                    ],
                    user_id: '',
                    temperature: 0.9,
                    top_k: 5,
                    top_p: 0.9,
                    max_tokens: 256,
                    model: 'gpt 3.5',
               },
          };

          try {
               const response = await axios.request(options);
               responseMessage = response.data; // Send the API response back to the client
          } catch (error) {
               console.error(error);
               return res.status(500).json({ error: 'Failed to fetch chatbot message' });
          }
     

     res.json({ advice: responseMessage });
};

// Load the data when the server starts
loadCSVData().catch((err) => {
     console.error('Error loading CSV data:', err);
});

// Make sure the CSV data is loaded before starting the server
module.exports = {
     getHome,
     postChatbot,
};
