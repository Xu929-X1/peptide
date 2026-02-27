import { OpenAI } from "openai/client.js";
import { ResponseCreateParamsNonStreaming, ResponseCreateParamsStreaming } from "openai/resources/responses/responses.js";

export interface OpenAIAdapterConfig {
    client: OpenAI;
}

export type OpenAIRequestNonStreaming = ResponseCreateParamsNonStreaming & { stream?: false }
export type OpenAIRequestStreaming = ResponseCreateParamsStreaming & { stream?: true }
export type OpenAIRequest = OpenAIRequestNonStreaming | OpenAIRequestStreaming;