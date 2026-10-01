import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import FactCheckOutlined from '@mui/icons-material/FactCheckOutlined'
import HistoryOutlined from '@mui/icons-material/HistoryOutlined'
import { Box, Button, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

interface NavItem {
  label: string
  to: string
  icon: ReactNode
  isActive: (pathname: string) => boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: PATHS.dashboard, icon: <DashboardOutlined />, isActive: (p) => p === '/' },
  { label: 'Readiness queue', to: PATHS.readiness, icon: <FactCheckOutlined />, isActive: (p) => p.startsWith('/readiness-queue') },
  { label: 'Run history', to: PATHS.history, icon: <HistoryOutlined />, isActive: (p) => p.startsWith('/run-history') },
]

// Always visible on every page (per spec): Dashboard | Readiness queue | Run history
export function TopNav() {
  const { pathname } = useLocation()

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        px: 3,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ mr: 2 }}>
        DataSwitch
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname)
          return (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              startIcon={item.icon}
              variant={active ? 'contained' : 'outlined'}
              color="primary"
              size="small"
              sx={active ? undefined : { color: 'text.secondary', borderColor: 'divider' }}
            >
              {item.label}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}
