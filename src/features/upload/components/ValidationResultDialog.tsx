import CheckCircle from '@mui/icons-material/CheckCircle'
import Close from '@mui/icons-material/Close'
import Error from '@mui/icons-material/Error'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import type { ImportValidationResult } from '@/types/domain'

interface ValidationResultDialogProps {
  open: boolean
  result: ImportValidationResult | null
  onClose: () => void
  onStartImport: () => void
}

// The popup shown right after a zip is read: "Valid" or "Invalid", with a
// per-folder breakdown so the user can see exactly what passed or failed.
export function ValidationResultDialog({ open, result, onClose, onStartImport }: ValidationResultDialogProps) {
  if (!result) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {result.valid ? (
          <CheckCircle color="success" />
        ) : (
          <Error color="error" />
        )}
        {result.valid ? 'Valid' : 'Invalid'}
        <IconButton onClick={onClose} sx={{ ml: 'auto' }} size="small" aria-label="Close">
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {result.fileName}
        </Typography>
        <List dense disablePadding>
          {result.checks.map((check) => {
            const ok = check.present && (check.hasFiles || (check.folder !== 'Data Sources' && check.folder !== 'Lineage'))
            return (
              <ListItem key={check.folder} disablePadding sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {ok ? <CheckCircle color="success" fontSize="small" /> : <Error color="error" fontSize="small" />}
                </ListItemIcon>
                <ListItemText
                  primary={check.folder}
                  secondary={
                    !check.present
                      ? 'Folder missing'
                      : check.hasFiles
                        ? 'Files present'
                        : 'Folder present, no files (optional for this folder)'
                  }
                />
              </ListItem>
            )
          })}
        </List>
        {result.errors.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {result.errors.map((err) => (
              <Typography key={err} variant="body2" color="error">
                {err}
              </Typography>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {result.valid && (
          <Button variant="contained" onClick={onStartImport}>
            Start import
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}