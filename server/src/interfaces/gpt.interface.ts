export interface ChatMessage {
  message: string;
}

export interface AICompletionRequest {
  model: string;
  prompt: string;
  max_tokens: number;
  top_p: number;
  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
}

export interface AICompletionResponse {
  data: {
    choices: {
      text?: string;
    }[];
  };
}
