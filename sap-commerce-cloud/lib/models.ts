export const MODELS = [
  { id: 'free/gpt-oss', label: 'Free Test (GPT-OSS)' },
  { id: 'openai/gpt-5.5', label: 'ChatGPT (GPT-5.5)' },
  { id: 'openai/gpt-5.4-mini', label: 'ChatGPT (GPT-5.4 mini)' },
  { id: 'mistral/mistral-large-4', label: 'Mistral Large' },
  { id: 'anthropic/claude-sonnet-5.5', label: 'Claude Sonnet 5.5' },
  { id: 'google/gemini-3.5-flash', label: 'Gemini 3.5 Flash' },
  { id: 'amazon/nova-pro', label: 'Amazon Nova Pro' },
  { id: 'amazon/nova-2-lite', label: 'Amazon Nova 2 Lite' },
  { id: 'deepseek/deepseek-v4-pro', label: 'DeepSeek V4 Pro' },
  { id: 'meta/llama-4-maverick', label: 'Llama 4 Maverick' },
  { id: 'alibaba/qwen3.8-max', label: 'Qwen 3.8 Max' },
  { id: 'moonshotai/kimi-k3', label: 'Kimi K3' },
] as const

export type ModelId = (typeof MODELS)[number]['id']

export const DEFAULT_MODEL: ModelId = MODELS[0].id

export function isModelId(value: unknown): value is ModelId {
  return MODELS.some((model) => model.id === value)
}

export function getModelLabel(id: ModelId) {
  return MODELS.find((model) => model.id === id)?.label ?? id
}
