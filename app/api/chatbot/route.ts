import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { userMessage } = await req.json();

    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'ff762d5a2fmsh06af197dc30343dp1fe482jsn3354cefce363',
            'x-rapidapi-host': 'custom-chatbot-api.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
        })
    };

    let botResponse = { advice: { result: '' } };
    let data;

    try {
        const response = await fetch('https://custom-chatbot-api.p.rapidapi.com/chatbotapi', options);
        data = await response.json();

        
        // Update the bot response with the relevant API response data
        botResponse.advice.result = data.result;
    } catch (error) {
        console.log(data);
        console.error(error);
        botResponse.advice.result = 'Failed to fetch chatbot message';
    }

    return NextResponse.json(botResponse);
}