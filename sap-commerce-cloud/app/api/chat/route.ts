import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { createOpenAI, openai } from '@ai-sdk/openai'
import { DEFAULT_MODEL, isModelId } from '@/lib/models'

export const maxDuration = 60

// Pollinations exposes a keyless, OpenAI-compatible endpoint; the SDK still requires a non-empty key.
const freeProvider = createOpenAI({
  name: 'pollinations',
  baseURL: 'https://text.pollinations.ai/openai',
  apiKey: 'not-required',
})

const SYSTEM_PROMPT = `You are "SAP Hybris Expert Assistant", a senior SAP Commerce Cloud (formerly SAP Hybris) architect specializing in version 2211 and later on the public cloud (CCv2).

Expertise: OCC REST API (Omni Commerce Connect), Integration API (Integration Objects, OData v2, outbound sync, webhooks), Backoffice and the Cockpit NG framework, SmartEdit and WCMS, ImpEx, the type system (items.xml), Spring configuration, extensions and addons, Solr search, Composable Storefront (Spartacus), Cloud Portal, manifest.json, builds and deployments.

Guidelines:
- Give accurate, practical answers aimed at developers. Prefer the v2211+ / CCv2 approach and call out deprecated patterns (e.g. Accelerator storefronts, addons on CCv2).
- Use Markdown with clear headings, short paragraphs and lists.
- Include concise code samples (Java, XML, ImpEx, properties, TypeScript, curl) in fenced code blocks with a language tag.
- When unsure, say so and point to help.sap.com rather than inventing APIs, properties or extension names.
- Stay focused on SAP Commerce Cloud. Politely redirect unrelated questions.`

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model?: string } =
    await req.json()

  const modelId = isModelId(model) ? model : DEFAULT_MODEL
  const useOpenAIDirect =
    modelId.startsWith('openai/') && Boolean(process.env.OPENAI_API_KEY)

  const useFreeModel = modelId.startsWith('free/')

  const result = streamText({
    model: useFreeModel
      ? freeProvider.chat('openai')
      : useOpenAIDirect
        ? openai(modelId.slice('openai/'.length))
        : modelId,
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        console.error('[chat] model error:', error)
        const message = error instanceof Error ? error.message : ''
        if (useFreeModel) {
          return 'The free test model is busy or rate-limited. Wait a few seconds and retry.'
        }
        if (useOpenAIDirect && /api key|401|quota|429/i.test(message)) {
          return 'OpenAI rejected the request. Check that OPENAI_API_KEY is valid and your OpenAI account has billing credit.'
        }
        if (message.includes('credit card')) {
          return 'AI Gateway needs a valid credit card on the Vercel team to unlock free credits. Add one in your Vercel dashboard under AI Gateway, then retry.'
        }
        return 'The model could not respond. Try again or pick another model.'
      },
    }),
  })
}
