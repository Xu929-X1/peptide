import Anthropic from "@anthropic-ai/sdk";

export interface AnthropicAdapterConfig {
    client: Anthropic;
}

export type AnthropicRequestNonStreaming = Anthropic.MessageCreateParamsNonStreaming
export type AnthropicRequestStreaming = Anthropic.MessageCreateParamsStreaming
export type AnthropicRequest = AnthropicRequestNonStreaming | AnthropicRequestStreaming