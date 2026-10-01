import { Card, CardContent, Typography } from '@mui/material'
import type { CardVariant } from '@/types/domain'

const VARIANT_TEXT_COLOR: Record<CardVariant, string> = {
  neutral: 'text.primary',
  success: '#15803d',
  warning: '#b45309',
  error: '#b91c1c',
}

interface StatCardProps {
  label: string
  value: number
  variant?: CardVariant
}

export function StatCard({ label, value, variant = 'neutral' }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, color: VARIANT_TEXT_COLOR[variant] }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
