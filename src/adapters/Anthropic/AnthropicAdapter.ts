import Anthropic from "@anthropic-ai/sdk";
import { AnthropicAdapterResponse } from "../type";
import { AnthropicAdapterConfig, AnthropicRequest, AnthropicRequestNonStreaming, AnthropicRequestStreaming } from "./type";
export async function callAnthropic(
    config: AnthropicAdapterConfig,
    params: AnthropicRequestNonStreaming
): Promise<AnthropicAdapterResponse>
// set response to never for now, will add streaming
//TODO: add streaming support
export async function callAnthropic(
    config: AnthropicAdapterConfig,
    params: AnthropicRequestStreaming
): Promise<never>
export async function callAnthropic(config: AnthropicAdapterConfig, request: AnthropicRequest): Promise<AnthropicAdapterResponse> {

    if (isStreamingRequest(request)) {
        throw new Error('Streaming not supported yet')
    }

    const raw = await config.client.messages.create(request)

    return {
        content: raw.content
            .filter((block): block is Anthropic.TextBlock => block.type === 'text')
            .map((block) => block.text)
            .join(''),
        model: raw.model,
        usage: {
            inputTokens:
                raw.usage.input_tokens +
                (raw.usage.cache_creation_input_tokens ?? 0) +
                (raw.usage.cache_read_input_tokens ?? 0),
            outputTokens: raw.usage.output_tokens,
        },
        raw,
    }

}
export function isStreamingRequest(req: AnthropicRequest): req is AnthropicRequestStreaming {
    return req.stream === true
}