import { Box } from '@mui/material'
import { StatCard } from '@/components/common/StatCard'
import type { SummaryCard } from '@/types/domain'

export function StatCardsRow({ cards }: { cards: SummaryCard[] }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
      {cards.map((c) => (
        <StatCard key={c.id} label={c.label} value={c.value} variant={c.variant} />
      ))}
    </Box>
  )
}
