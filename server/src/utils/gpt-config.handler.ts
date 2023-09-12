import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export const openai = new OpenAIApi(config);
