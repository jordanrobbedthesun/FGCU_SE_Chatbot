const express = require('express');
const { json } = require('express');
const router = express.Router();
const controller = require('../controllers/home/controller');
router.use(json());

// Define the route for the home and chatbot
router.get('/', controller.getHome);
router.post('/chatbot', controller.postChatbot);

module.exports = router;