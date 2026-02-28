import { AdapterFn, AdapterResponse } from '../adapters/type.ts'
import { PeptideHooks } from '../hooks/type.ts'
import { runPipeline } from './pipeline/Pipeline.ts'
import { PeptideInput } from './type.ts'

interface BuilderState<TConfig, TRequest, TResponse extends AdapterResponse> {
    adapterFn: AdapterFn<TConfig, TRequest, TResponse>
    adapterConfig: TConfig
    baseRequest: Partial<TRequest>
    hooks?: PeptideHooks
}

export class PeptideBuilder<
    TConfig,
    TRequest extends { model?: string },
    TResponse extends AdapterResponse,
    TModel extends string
> {
    private readonly state: BuilderState<TConfig, TRequest, TResponse>

    constructor(state: BuilderState<TConfig, TRequest, TResponse>) {
        this.state = state
    }

    /**
     * Set the model - constrained to the adapter's valid Model type
     */
    model(m: TModel): PeptideBuilder<TConfig, TRequest, TResponse, TModel> {
        return new PeptideBuilder({
            ...this.state,
            baseRequest: { ...this.state.baseRequest, model: m },
        })
    }

    /**
     * Set additional adapter-specific params.
     * Excludes 'model', 'messages' (Anthropic), 'input' (OpenAI), 'system', 'instructions'
     * as these are managed by the builder/pipeline.
     */
    params(
        p: Omit<Partial<TRequest>, 'model' | 'messages' | 'input' | 'system' | 'instructions'>
    ): PeptideBuilder<TConfig, TRequest, TResponse, TModel> {
        return new PeptideBuilder({
            ...this.state,
            baseRequest: { ...this.state.baseRequest, ...p },
        })
    }

    /**
     * Set lifecycle hooks
     */
    hooks(h: PeptideHooks): PeptideBuilder<TConfig, TRequest, TResponse, TModel> {
        return new PeptideBuilder({
            ...this.state,
            hooks: h,
        })
    }

    /**
     * Terminal operation - executes the pipeline
     */
    async complete(input: PeptideInput): Promise<TResponse> {
        if (!this.state.baseRequest.model) {
            throw new Error('Model must be set before calling complete(). Use .model() first.')
        }

        return runPipeline(
            {
                adapterFn: this.state.adapterFn,
                adapterConfig: this.state.adapterConfig,
                baseRequest: this.state.baseRequest as Omit<TRequest, 'messages' | 'input'>,
                hooks: this.state.hooks,
            },
            input
        )
    }
}