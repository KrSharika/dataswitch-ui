import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/layout/PageHeader'
import { PATHS } from '@/routes/paths'
import type { ImportValidationResult } from '@/types/domain'
import { DropZone } from './components/DropZone'
import { FileInfoRow } from './components/FileInfoRow'
import { ValidationResultDialog } from './components/ValidationResultDialog'
import { validateZip } from './utils/validateZip'

export function UploadFilesPage() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'checking' | 'valid' | 'invalid'>('checking')
  const [result, setResult] = useState<ImportValidationResult | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  async function handleFileSelected(selected: File) {
    setFile(selected)
    setStatus('checking')
    setResult(null)

    const validation = await validateZip(selected)

    setResult(validation)
    setStatus(validation.valid ? 'valid' : 'invalid')
    setDialogOpen(true) // the popup: "Valid" or "Invalid"
  }

  function handleCancel() {
    setFile(null)
    setResult(null)
    navigate(PATHS.dashboard)
  }

  function handleStartImport() {
    setDialogOpen(false)
    navigate(PATHS.building)
  }

  return (
    <>
      <PageHeader title="Upload files" subtitle="Drag & drop or click to select the BW export zip" onBack={() => navigate(PATHS.dashboard)} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 480,
                mx: 'auto',
                minHeight: '60vh',
                justifyContent: 'center',
              }}
            >
        <DropZone onFileSelected={handleFileSelected} />

        {file && <FileInfoRow fileName={file.name} sizeBytes={file.size} status={status} />}

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" disabled={status !== 'valid'} onClick={handleStartImport}>
            Start import
          </Button>
        </Box>
      </Box>

      <ValidationResultDialog
        open={dialogOpen}
        result={result}
        onClose={() => setDialogOpen(false)}
        onStartImport={handleStartImport}
      />
    </>
  )
}