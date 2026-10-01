import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined'
import { Box, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import type { DragEvent } from 'react'

interface DropZoneProps {
  onFileSelected: (file: File) => void
}

// Accepts .zip only, via click-to-browse or drag-and-drop.
export function DropZone({ onFileSelected }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) onFileSelected(file)
  }

  return (
    <Box
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      sx={{
        border: '2px dashed',
        borderColor: dragOver ? 'primary.main' : 'divider',
        borderRadius: 2,
        bgcolor: dragOver ? 'action.hover' : 'transparent',
        p: 5,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".zip"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelected(file)
          e.target.value = '' // allow re-selecting the same file
        }}
      />
      <CloudUploadOutlined sx={{ fontSize: 36, color: 'text.secondary', mb: 1 }} />
      <Typography sx={{ fontWeight: 700 }}>Click to Upload or Drop Files</Typography>
      <Typography variant="body2" color="text.secondary">
        .zip only
      </Typography>
    </Box>
  )
}