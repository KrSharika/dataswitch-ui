import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { TopNav } from '@/components/layout/TopNav'

export function AppShell() {
  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default', p: 1.5, boxSizing: 'border-box' }}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          minHeight: 'calc(100vh - 24px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopNav />
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
