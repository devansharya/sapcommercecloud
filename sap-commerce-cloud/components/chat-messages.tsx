'use client'

import type { UIMessage } from 'ai'
import { AlertTriangle, Bot, Pencil, RotateCw } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Streamdown } from 'streamdown'
import { TOPICS } from '@/lib/topics'

type ChatMessagesProps = {
  messages: UIMessage[]
  isBusy: boolean
  error: Error | undefined
  onRetrigger: (messageId: string) => void
  onEdit: (messageId: string) => void
  onRetry: () => void
  onSelectTopic: (prompt: string) => void
}

function getText(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
}

function BotAvatar() {
  return (
    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm">
      <Bot className="size-5" aria-hidden="true" />
    </div>
  )
}

export function ChatMessages({
  messages,
  isBusy,
  error,
  onRetrigger,
  onEdit,
  onRetry,
  onSelectTopic,
}: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null)
  const lastText = messages.length ? getText(messages[messages.length - 1]) : ''

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, lastText, error])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-10">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-foreground">
            {'[y]'}
          </div>
          <h1 className="mt-5 text-balance text-2xl font-semibold text-foreground">
            How can I help with SAP Commerce Cloud?
          </h1>
          <p className="mt-2 text-pretty text-muted-foreground">
            Ask about OCC, the Integration API, Backoffice, SmartEdit, ImpEx,
            CCv2 deployments and more.
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.title}
                type="button"
                onClick={() => onSelectTopic(topic.prompt)}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <topic.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {topic.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {topic.subtitle}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const last = messages[messages.length - 1]
  const showThinking = isBusy && (last.role === 'user' || !getText(last))

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6" aria-live="polite">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {messages.map((message) => {
          const text = getText(message)
          if (message.role === 'user') {
            return (
              <div key={message.id} className="flex flex-col items-end gap-2">
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-5 py-3 text-primary-foreground">
                  {text}
                </div>
                <div className="flex gap-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => onRetrigger(message.id)}
                    className="flex items-center gap-1 hover:text-foreground disabled:opacity-40"
                  >
                    <RotateCw className="size-3.5" aria-hidden="true" />
                    Retrigger
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => onEdit(message.id)}
                    className="flex items-center gap-1 hover:text-foreground disabled:opacity-40"
                  >
                    <Pencil className="size-3.5" aria-hidden="true" />
                    Edit
                  </button>
                </div>
              </div>
            )
          }
          if (!text) return null
          return (
            <div key={message.id} className="flex gap-3">
              <BotAvatar />
              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-border bg-card px-5 py-4 text-sm leading-relaxed text-card-foreground shadow-sm md:text-base">
                <Streamdown>{text}</Streamdown>
              </div>
            </div>
          )
        })}

        {showThinking && (
          <div className="flex gap-3">
            <BotAvatar />
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border bg-card px-5 py-4 shadow-sm">
              <span className="sr-only">Assistant is thinking</span>
              <span className="size-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.3s]" />
              <span className="size-2 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
              <span className="size-2 animate-bounce rounded-full bg-primary/60" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex gap-3">
            <BotAvatar />
            <div className="flex-1 rounded-2xl rounded-tl-md border border-destructive/30 bg-destructive/5 px-5 py-4">
              <p className="flex items-center gap-2 font-semibold text-destructive">
                <AlertTriangle className="size-4" aria-hidden="true" />
                Something went wrong
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {error.message || 'The model could not respond. Try again or pick another model.'}
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <RotateCw className="size-4" aria-hidden="true" />
                Retry
              </button>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
