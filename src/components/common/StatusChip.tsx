import { Chip } from '@mui/material'
import { STATUS_META } from '@/constants/statuses'

export function StatusChip({ status }: { status: string }) {
  const meta = STATUS_META[status] ?? { label: status, color: 'default' as const }
  return <Chip label={meta.label} color={meta.color} size="small" variant="outlined" />
}
