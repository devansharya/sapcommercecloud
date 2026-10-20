'use client'

import { Send, Square } from 'lucide-react'
import type { RefObject } from 'react'

type ChatInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
  isBusy: boolean
  inputRef: RefObject<HTMLTextAreaElement | null>
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isBusy,
  inputRef,
}: ChatInputProps) {
  return (
    <div className="shrink-0 border-t border-border bg-card px-4 py-4 md:px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-primary/50"
      >
        <label htmlFor="chat-input" className="sr-only">
          Ask about SAP Commerce Cloud
        </label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder="Ask about SAP Commerce Cloud..."
          className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-base leading-6 text-foreground placeholder:text-muted-foreground focus:outline-none field-sizing-content"
        />
        {isBusy ? (
          <button
            type="button"
            onClick={onStop}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background hover:opacity-90"
          >
            <Square className="size-4" />
            <span className="sr-only">Stop generating</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!value.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            <Send className="size-4" />
            <span className="sr-only">Send message</span>
          </button>
        )}
      </form>
    </div>
  )
}
