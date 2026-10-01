import { Box, Card, CardContent, Typography } from '@mui/material'
import { LayerProgressBar } from '@/components/common/LayerProgressBar'
import type { LayerStatus } from '@/types/domain'

export function LayerProgressList({ title, layers }: { title: string; layers: LayerStatus[] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {layers.map((layer) => (
            <LayerProgressBar
              key={layer.id}
              label={layer.label}
              display={layer.display}
              percentComplete={layer.percentComplete}
              variant={layer.progressVariant}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
