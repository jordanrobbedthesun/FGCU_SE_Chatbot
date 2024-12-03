import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import csv from 'csv-parser';

let fgcuData: any[] = [];
let dataLoaded = false;

interface CSVRow {
    [key: string]: string;
}

// TODO: this should be a JSON for better performance
const loadCSVData = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const data: CSVRow[] = [];
        fs.createReadStream('backend/csv/schedule_data.csv')
            .pipe(csv())
            .on('data', (row: CSVRow) => {
                data.push(row);
            })
            .on('end', () => {
                fgcuData = data;
                dataLoaded = true;
                console.log('FGCU data loaded successfully.');
                resolve();
            })
            .on('error', (err: Error) => {
                reject(err);
            });
    });
};

// Ensure the CSV data is loaded before handling requests
if (!dataLoaded) {
    loadCSVData().catch((err) => {
        console.error('Error loading CSV data:', err);
    });
}

export async function POST(req: NextRequest) {
    const { userMessage } = await req.json();

    // Ensure the CSV data is loaded before processing messages
    if (fgcuData.length === 0) {
        return NextResponse.json({ error: 'FGCU data is still loading, please try again later.' }, { status: 500 });
    }

    // Initialize response message
    let responseMessage = "I couldn't understand your request. Can you please clarify?";

    // If not a class query, fallback to using the chatbot API
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY || '',
            'x-rapidapi-host': process.env.RAPIDAPI_HOST || '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
    };

    let data;

    try {
        const response = await fetch('https://custom-chatbot-api.p.rapidapi.com/chatbotapi', options);
        data = await response.json();
        if (!response.ok) throw new Error(data);
        responseMessage = data; // Send the API response back to the client
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch chatbot message' }, { status: 500 });
    }

    return NextResponse.json({ advice: responseMessage });
}