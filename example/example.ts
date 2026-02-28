import { createPeptide, AdapterResponse } from '../src/index.ts'

const mockAdapter = Object.assign(
    async (_config: {}, _request: { model?: string; messages?: any }) => ({
        content: 'Mock response: ' + JSON.stringify(_request),
        model: _request.model ?? 'mock-model',
        usage: { inputTokens: 10, outputTokens: 20 }
    }),
    { inputShape: 'anthropic' as const }
)

const llm = createPeptide(mockAdapter, {})
    .model('mock-model')
    .params({ max_tokens: 100 })
    .hooks({
        beforeCall: async (input) => {
            console.log('beforeCall:', input)
        },
        afterCall: async (input, response) => {
            console.log('afterCall:', response.usage)
        }
    })

const result = await llm.complete({ 
    userPrompt: 'Hello!',
    systemPrompt: 'You are helpful.'
})

console.log('result:', result.content)