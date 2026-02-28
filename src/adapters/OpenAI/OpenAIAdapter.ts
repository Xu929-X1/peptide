import { OpenAIAdapterResponse } from "../type.ts";
import { OpenAIAdapterConfig, OpenAIRequest, OpenAIRequestStreaming } from "./type.ts";

export async function callOpenAI(config: OpenAIAdapterConfig, request: OpenAIRequest): Promise<OpenAIAdapterResponse> {

    if (isStreamingRequest(request)) {
        throw new Error('Streaming not supported yet')
    }

    const raw = await config.client.responses.create(request);

    return {
        content: raw.output_text,
        model: raw.model,
        usage: {
            inputTokens: raw.usage?.input_tokens ?? 0,
            outputTokens: raw.usage?.output_tokens ?? 0
        },
        raw
    }
}

callOpenAI.inputShape = "openai";

export function isStreamingRequest(req: OpenAIRequest): req is OpenAIRequestStreaming {
    return req.stream === true
}