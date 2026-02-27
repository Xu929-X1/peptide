import Anthropic from "@anthropic-ai/sdk"
import type { Response as OpenAIResponse } from 'openai/resources/responses/responses'
import { Model as AnthropicModel } from "@anthropic-ai/sdk/resources"
import { ResponsesModel as OpenAIModel } from "openai/resources/shared"

export interface AdapterMeta<TRequest, TModel extends string>{
    modelType: TModel
}

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

export type AdapterFn<TConfig, TRequest, TResponse extends AdapterResponse> = (config: TConfig, request: TRequest) => Promise<TResponse>
