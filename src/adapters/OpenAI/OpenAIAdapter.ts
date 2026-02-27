import { AdapterResponse } from "../type";
import { OpenAIAdapterConfig, OpenAIRequest, OpenAIRequestStreaming } from "./type";

export async function callOpenAI(config: OpenAIAdapterConfig, request: OpenAIRequest): Promise<AdapterResponse> {

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
        }
    }
}

export function isStreamingRequest(req: OpenAIRequest): req is OpenAIRequestStreaming {
    return req.stream === true
}