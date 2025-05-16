

// To run this code, ensure the following dependencies are installed:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

// Initialize the AI model with the API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Ensure this is set in your .env file

if (!apiKey) {
  console.log("Error: GEMINI_API_KEY is not set in the environment variables.");
}

const ai = new GoogleGenAI({
  apiKey,
});

const config = {
  responseMimeType: 'application/json',
  temperature: 0.5,
  topP: 0.8,
  topK: 40,
};

const model = 'gemini-1.5-flash';

// Function to generate a travel plan
export const generateTravelPlan = async (contents) => {
  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

     // Log the response to the console
    return result; // Return the response for further use
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
};