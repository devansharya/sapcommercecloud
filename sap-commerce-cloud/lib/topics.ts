import { BookOpen, Cpu, Layers, Settings, type LucideIcon } from 'lucide-react'

export type Topic = {
  title: string
  subtitle: string
  icon: LucideIcon
  prompt: string
}

export const TOPICS: Topic[] = [
  {
    title: 'OCC API',
    subtitle: 'Omni Commerce Connect',
    icon: Cpu,
    prompt: 'Tell me about OCC API in SAP Commerce Cloud v2211+',
  },
  {
    title: 'Integration API',
    subtitle: 'OData & Webhooks',
    icon: Layers,
    prompt:
      'Explain the Integration API module in SAP Commerce Cloud v2211+, including Integration Objects, OData services and outbound webhooks.',
  },
  {
    title: 'Backoffice',
    subtitle: 'Cockpit Framework',
    icon: Settings,
    prompt:
      'How do I customize the Backoffice in SAP Commerce Cloud v2211+? Cover widgets, cockpit-config.xml and creating a custom backoffice extension.',
  },
  {
    title: 'SmartEdit',
    subtitle: 'CMS Management',
    icon: BookOpen,
    prompt:
      'Explain SmartEdit in SAP Commerce Cloud v2211+ and how to make custom CMS components editable with it.',
  },
]
