import Anthropic from "@anthropic-ai/sdk"
import type { Response as OpenAIResponse } from 'openai/resources/responses/responses'

export interface AdapterResponse {
    content: string,
    model: string,
    usage: {
        /**
         * Anthropic formula: Total Input Tokens = input_tokens + cache_creation_input_tokens + cache_read_input_tokens
         */
        inputTokens: number,
        outputTokens: number
    }
}

export interface AnthropicAdapterResponse extends AdapterResponse {
    raw: Anthropic.Message
}

export interface OpenAIAdapterResponse extends AdapterResponse {
    raw: OpenAIResponse
}