import CheckCircle from '@mui/icons-material/CheckCircle'
import Error from '@mui/icons-material/Error'
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined'
import { Box, CircularProgress, Typography } from '@mui/material'

interface FileInfoRowProps {
  fileName: string
  sizeBytes: number
  status: 'checking' | 'valid' | 'invalid'
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// Shows the selected file name + size, with a live validation-status icon.
export function FileInfoRow({ fileName, sizeBytes, status }: FileInfoRowProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <InsertDriveFileOutlined color="action" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: 600 }}>
          {fileName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatSize(sizeBytes)}
        </Typography>
      </Box>
      {status === 'checking' && <CircularProgress size={20} />}
      {status === 'valid' && <CheckCircle color="success" />}
      {status === 'invalid' && <Error color="error" />}
    </Box>
  )
}