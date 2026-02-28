import { OpenAI } from "openai/client.js";

export interface OpenAIAdapterConfig {
    client: OpenAI;
}

export type OpenAIRequestNonStreaming = OpenAI.Responses.ResponseCreateParamsNonStreaming
export type OpenAIRequestStreaming = OpenAI.Responses.ResponseCreateParamsStreaming
export type OpenAIRequest = OpenAIRequestNonStreaming | OpenAIRequestStreaming;