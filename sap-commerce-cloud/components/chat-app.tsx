'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { ChatHeader } from '@/components/chat-header'
import { ChatInput } from '@/components/chat-input'
import { ChatMessages } from '@/components/chat-messages'
import { DEFAULT_MODEL, getModelLabel, type ModelId } from '@/lib/models'

export function ChatApp() {
  const [input, setInput] = useState('')
  const [model, setModel] = useState<ModelId>(DEFAULT_MODEL)
  const [menuOpen, setMenuOpen] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { messages, sendMessage, regenerate, setMessages, status, error, stop, clearError } =
    useChat()

  const isBusy = status === 'submitted' || status === 'streaming'

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed }, { body: { model } })
    setInput('')
    setMenuOpen(false)
  }

  function retrigger(messageId: string) {
    const index = messages.findIndex((m) => m.id === messageId)
    if (index === -1) return
    clearError()
    setMessages(messages.slice(0, index + 1))
    regenerate({ body: { model } })
  }

  function edit(messageId: string) {
    const index = messages.findIndex((m) => m.id === messageId)
    if (index === -1) return
    const text = messages[index].parts
      .map((part) => (part.type === 'text' ? part.text : ''))
      .join('')
    clearError()
    setMessages(messages.slice(0, index))
    setInput(text)
    inputRef.current?.focus()
  }

  function clearChat() {
    stop()
    clearError()
    setMessages([])
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <AppSidebar
        modelLabel={getModelLabel(model)}
        disabled={isBusy}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectTopic={send}
      />
      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader
          model={model}
          onModelChange={setModel}
          onClear={clearChat}
          onOpenMenu={() => setMenuOpen(true)}
          canClear={messages.length > 0}
        />
        <ChatMessages
          messages={messages}
          isBusy={isBusy}
          error={error}
          onRetrigger={retrigger}
          onEdit={edit}
          onRetry={() => {
            clearError()
            regenerate({ body: { model } })
          }}
          onSelectTopic={send}
        />
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => send(input)}
          onStop={stop}
          isBusy={isBusy}
          inputRef={inputRef}
        />
      </main>
    </div>
  )
}
