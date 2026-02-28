export interface PeptideInput {
    userPrompt: string;
    systemPrompt?: string;
    context?: string;
}

export interface PeptideBuilder<TConfig, TRequest, TResponse, TModel extends string> {
    model(m: TModel): this
    params(p: Omit<Partial<TRequest>, "model" | "messages">): this
    complete(input: PeptideInput): Promise<TResponse>
}