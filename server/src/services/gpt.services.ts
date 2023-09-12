import {
  AICompletionRequest,
  AICompletionResponse,
} from "../interfaces/gpt.interface";
import { openai } from "../utils/gpt-config.handler";

async function searchFilms(
  characteristics: string
): Promise<{ titles: string[] }> {
  const message = `Given a set of specific characteristics, I need you to generate a JSON object that contains the titles of all movies that meet the following conditions: ${characteristics}. The JSON object should have the following format:
  {
    "movies": [
        {
            "title": "<Movie Title>"
        },
        {
            "title": "<Movie Title>"
        },
        ... and so on
    ]
  }

  `;

  const params: AICompletionRequest = {
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 300,
    top_p: 1.0,
    temperature: 0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const response: AICompletionResponse = await openai.createCompletion(params);

  if (response.data.choices && response.data.choices[0]?.text) {
    const result = JSON.parse(response.data.choices[0].text.trim());

    return result;
  } else {
    throw new Error("No choices in response");
  }
}
async function generateChatResponse(message: string): Promise<string> {
  const params: AICompletionRequest = {
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 300,
    top_p: 1.0,
    temperature: 0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const response: AICompletionResponse = await openai.createCompletion(params);

  if (response.data.choices && response.data.choices[0]?.text) {
    return response.data.choices[0].text.trim();
  } else {
    throw new Error("No choices in response");
  }
}
export { generateChatResponse, searchFilms };
