import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'
import { BuildingObjectsPage } from '@/features/building/BuildingObjectsPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { DependencyViewPage } from '@/features/dependency/DependencyViewPage'
import { DeploymentPage } from '@/features/deployment/DeploymentPage'
import { FixPanelPage } from '@/features/fix/FixPanelPage'
import { RunHistoryPage } from '@/features/history/RunHistoryPage'
import { ReadinessQueuePage } from '@/features/readiness/ReadinessQueuePage'
import { UploadFilesPage } from '@/features/upload/UploadFilesPage'
import { PATHS } from './paths'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: PATHS.dashboard, element: <DashboardPage /> },
      { path: PATHS.import, element: <UploadFilesPage /> },
      { path: PATHS.building, element: <BuildingObjectsPage /> },
      { path: PATHS.readiness, element: <ReadinessQueuePage /> },
      { path: PATHS.fix(), element: <FixPanelPage /> },
      { path: PATHS.flow(), element: <DependencyViewPage /> },
      { path: PATHS.deployment, element: <DeploymentPage /> },
      { path: PATHS.history, element: <RunHistoryPage /> },
    ],
  },
])
