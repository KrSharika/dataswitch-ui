import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined'
import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 10, gap: 1 }}>
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          bgcolor: '#f1f5f9',
          display: 'grid',
          placeItems: 'center',
          color: 'text.secondary',
        }}
      >
        <CloudUploadOutlined />
      </Box>
      <Typography sx={{ fontWeight: 700, color: 'text.secondary' }}>{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  )
}
