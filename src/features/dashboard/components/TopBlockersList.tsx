import { Card, CardContent, Chip, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { TopBlockerItem } from '@/types/domain'

export function TopBlockersList({ title, items }: { title: string; items: TopBlockerItem[] }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <List disablePadding>
          {items.map((b) => (
            // Uses the link the backend sent, rather than building it on the frontend.
            <ListItemButton key={b.id} onClick={() => navigate(b.link)} sx={{ borderRadius: 1 }}>
              <ListItemText primary={b.label} />
              <Chip label={b.display} size="small" />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
