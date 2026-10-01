import { Box, LinearProgress, Typography } from '@mui/material'
import type { CardVariant } from '@/types/domain'

interface LayerProgressBarProps {
  label: string
  display: string // backend-formatted e.g. "18 / 18" — render as-is, do not recompute
  percentComplete: number
  variant: CardVariant
}

export function LayerProgressBar({ label, display, percentComplete, variant }: LayerProgressBarProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {display}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentComplete}
        color={variant === 'neutral' ? 'primary' : variant}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  )
}
