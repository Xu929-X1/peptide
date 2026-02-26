import Anthropic from "@anthropic-ai/sdk"

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