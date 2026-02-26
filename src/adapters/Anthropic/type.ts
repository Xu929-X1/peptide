import Anthropic from "@anthropic-ai/sdk";
import { MessageCreateParamsNonStreaming, MessageCreateParamsStreaming } from "@anthropic-ai/sdk/resources";

export interface AnthropicAdapterConfig {
    client: Anthropic; //user need to create their own client and pass it in
}

export type AnthropicRequestNonStreaming = MessageCreateParamsNonStreaming & { stream?: false }
export type AnthropicRequestStreaming = MessageCreateParamsStreaming & { stream: true }
export type AnthropicRequest = AnthropicRequestNonStreaming | AnthropicRequestStreaming