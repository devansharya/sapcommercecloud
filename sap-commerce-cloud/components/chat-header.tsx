import { ChevronDown, ExternalLink, Globe, Menu } from 'lucide-react'
import { MODELS, type ModelId } from '@/lib/models'

type ChatHeaderProps = {
  model: ModelId
  onModelChange: (model: ModelId) => void
  onClear: () => void
  onOpenMenu: () => void
  canClear: boolean
}

export function ChatHeader({
  model,
  onModelChange,
  onClear,
  onOpenMenu,
  canClear,
}: ChatHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-6">
      <button
        type="button"
        onClick={onOpenMenu}
        className="rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
      >
        <Menu className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <div className="relative">
          <label htmlFor="model-select" className="sr-only">
            Model
          </label>
          <Globe
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
            aria-hidden="true"
          />
          <select
            id="model-select"
            value={model}
            onChange={(e) => onModelChange(e.target.value as ModelId)}
            className="h-10 appearance-none rounded-lg border border-border bg-card pl-9 pr-9 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={!canClear}
          className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
        >
          Clear Chat
        </button>
        <a
          href="https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Official Docs
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </header>
  )
}
