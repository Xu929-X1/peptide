import { AdapterFn, AdapterResponse } from "../../adapters/type.ts";
import { PeptideHooks } from "../../hooks/type.ts";
import { PeptideInput } from "../type.ts";

export interface PipelineConfig<TConfig, TRequest, TResponse extends AdapterResponse> {
    adapterFn: AdapterFn<TConfig, TRequest, TResponse>
    adapterConfig: TConfig
    baseRequest: Omit<TRequest, 'messages' | 'input'>
    hooks?: PeptideHooks
}

function buildAnthropicMessages(input: PeptideInput): {
    messages: Array<{ role: "user"; content: string }>
    system?: string
} {
    const userContent = input.context
        ? `${input.context}\n\n${input.userPrompt}`
        : input.userPrompt

    return {
        messages: [{ role: 'user', content: userContent }],
        ...(input.systemPrompt ? { system: input.systemPrompt } : {}),
    }
}

function buildOpenAIMessages(input: PeptideInput): {
    input: string,
    instructions?: string
} {
    const userContent = input.context
        ? `${input.context}\n\n${input.userPrompt}`
        : input.userPrompt;

    return {
        input: userContent,
        ...(input.systemPrompt ? { instructions: input.systemPrompt } : {}),
    }
}



export async function runPipeline<TConfig, TRequest, TResponse extends AdapterResponse>(
    config: PipelineConfig<TConfig, TRequest, TResponse>,
    input: PeptideInput
): Promise<TResponse> {
    if (config.hooks?.beforeCall) {
        await config.hooks.beforeCall(input)
    }

    const inputFields = config.adapterFn.inputShape === 'anthropic'
        ? buildAnthropicMessages(input)
        : buildOpenAIMessages(input)

    const request = {
        ...config.baseRequest,
        ...inputFields,
    } as TRequest

    const response = await config.adapterFn(config.adapterConfig, request)

    if (config.hooks?.afterCall) {
        await config.hooks.afterCall(input, response)
    }

    return response
}