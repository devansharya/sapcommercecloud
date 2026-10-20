import { Search, X } from 'lucide-react'
import { TOPICS } from '@/lib/topics'
import { cn } from '@/lib/utils'

type AppSidebarProps = {
  modelLabel: string
  disabled: boolean
  open: boolean
  onClose: () => void
  onSelectTopic: (prompt: string) => void
}

export function AppSidebar({
  modelLabel,
  disabled,
  open,
  onClose,
  onSelectTopic,
}: AppSidebarProps) {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-sidebar-border px-5 py-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-white text-xl font-bold text-primary">
                {'[y]'}
              </div>
              <div className="leading-tight">
                <p className="text-lg font-bold text-white">SAP Hybris</p>
                <p className="text-lg font-bold text-sidebar-primary">
                  Expert Assistant
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-sidebar-foreground/70">
              v2211+ Public Cloud Specialist
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white lg:hidden"
          >
            <X className="size-5" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Quick topics" className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Quick Topics
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            {TOPICS.map((topic) => (
              <li key={topic.title}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onSelectTopic(topic.prompt)}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-sidebar-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <topic.icon className="size-5 shrink-0 text-blue-400" aria-hidden="true" />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      {topic.title}
                    </span>
                    <span className="text-xs text-sidebar-foreground/60">
                      {topic.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <section className="mx-1 mt-6 rounded-lg border border-sidebar-border bg-sidebar-accent/60 p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
              <Search className="size-4 text-sidebar-foreground/60" aria-hidden="true" />
              Model Configuration
            </h2>
            <dl className="mt-3 flex flex-col gap-1.5 text-xs">
              <div className="flex gap-1.5">
                <dt className="text-sidebar-foreground/70">Model:</dt>
                <dd className="font-mono text-white">{modelLabel}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-sidebar-foreground/70">Provider:</dt>
                <dd className="font-mono text-sidebar-primary">AI Gateway</dd>
              </div>
            </dl>
            <p className="mt-3 border-t border-sidebar-border pt-3 text-xs italic text-sidebar-foreground/50">
              No personal API keys required. Requests go through Vercel AI
              Gateway.
            </p>
          </section>
        </nav>

        <footer className="border-t border-sidebar-border px-5 py-4 text-center text-xs">
          <p className="font-medium text-sidebar-foreground/80">
Created by: Devansh Arya
  </p>
  <p className="mt-1 text-sidebar-foreground/60">
  Date: October 20, 2026 | Version: 1.1
          </p>
          <p className="mt-3 text-sidebar-foreground/40">
            Not an official SAP product. Use for guidance only.
          </p>
        </footer>
      </aside>
    </>
  )
}
