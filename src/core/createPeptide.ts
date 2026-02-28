import { AdapterFn, AdapterResponse, AnthropicAdapterResponse, OpenAIAdapterResponse } from '../adapters/type.ts'
import { AnthropicAdapterConfig, AnthropicRequest } from '../adapters/Anthropic/type.ts'
import { OpenAIAdapterConfig, OpenAIRequest } from '../adapters/OpenAI/type.ts'
import { callAnthropic } from '../adapters/Anthropic/AnthropicAdapter.ts'
import { callOpenAI } from '../adapters/OpenAI/OpenAIAdapter.ts'
import { Model as AnthropicModel } from '@anthropic-ai/sdk/resources'
import { ResponsesModel as OpenAIModel } from 'openai/resources/shared'
import { PeptideBuilder } from './PeptideBuilder.ts'

/**
 * Create a Peptide builder with the Anthropic adapter.
 *
 * @example
 * const llm = createPeptide(callAnthropic, { client })
 *   .model('claude-opus-4-5')
 *   .params({ max_tokens: 1024 })
 *
 * const result = await llm.complete({ userPrompt: 'Hello!' })
 */
export function createPeptide(
    adapterFn: typeof callAnthropic,
    adapterConfig: AnthropicAdapterConfig
): PeptideBuilder<AnthropicAdapterConfig, AnthropicRequest, AnthropicAdapterResponse, AnthropicModel>

export function createPeptide(
    adapterFn: typeof callOpenAI,
    adapterConfig: OpenAIAdapterConfig
): PeptideBuilder<OpenAIAdapterConfig, OpenAIRequest, OpenAIAdapterResponse, OpenAIModel>

export function createPeptide<TConfig, TRequest extends { model?: string }, TResponse extends AdapterResponse, TModel extends string>(
    adapterFn: AdapterFn<TConfig, TRequest, TResponse>,
    adapterConfig: TConfig
): PeptideBuilder<TConfig, TRequest, TResponse, TModel>

export function createPeptide(
    adapterFn: any,
    adapterConfig: any
): any {
    return new PeptideBuilder({
        adapterFn,
        adapterConfig,
        baseRequest: {},
    })
}