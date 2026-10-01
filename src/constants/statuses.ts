import type { CardVariant } from '@/types/domain'

export type ChipColor = 'success' | 'default' | 'error' | 'warning' | 'info'

// Backend-sent variant -> MUI color. Used for summary cards and layer progress bars.
export const VARIANT_COLOR: Record<CardVariant, ChipColor> = {
  neutral: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
}

// Kept for object/model status chips elsewhere in the app (Readiness queue, Fix panel) —
// unrelated to the dashboard's CardVariant above.
export const STATUS_META: Record<string, { label: string; color: ChipColor }> = {
  deployed: { label: 'Deployed', color: 'success' },
  ready: { label: 'Ready', color: 'info' },
  blocked: { label: 'Blocked', color: 'error' },
  waiting: { label: 'Waiting', color: 'warning' },
  failed: { label: 'Failed', color: 'error' },
  partially_deployed: { label: 'Partially Deployed', color: 'warning' },
}
