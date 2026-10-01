import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined'
import { Alert, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getPipelineSummary } from '@/api/dashboard'
import { LoadingState } from '@/components/common/LoadingState'
import { PageHeader } from '@/components/layout/PageHeader'
import { useAsync } from '@/hooks/useAsync'
import { LayerProgressList } from './components/LayerProgressList'
import { StatCardsRow } from './components/StatCardsRow'
import { TopBlockersList } from './components/TopBlockersList'

export function DashboardPage() {
  const navigate = useNavigate()
  const { data, loading, error } = useAsync(getPipelineSummary)

  return (
    <>
      <PageHeader
        title={data?.header.title ?? 'Dashboard'}
        subtitle={data?.header.subtitle}
        actions={
          // Import objects route is hardcoded here (frontend-owned), not read from the
          // backend's header.actions — see the note in domain.ts on why that was dropped.
          <Button variant="contained" startIcon={<UploadFileOutlined />} onClick={() => navigate('/import')}>
            Import objects
          </Button>
        }
      />
      {loading && <LoadingState />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StatCardsRow cards={data.summaryCards} />
          <LayerProgressList title={data.statusByLayer.title} layers={data.statusByLayer.layers} />
          <TopBlockersList title={data.topBlockers.title} items={data.topBlockers.items} />
        </Box>
      )}
    </>
  )
}
