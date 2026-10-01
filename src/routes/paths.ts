// Route names match the links already present in the backend's dashboard_mock.json
// ("/readiness-queue", "/run-history"), so TopBlockersList's navigate(b.link) and
// StatCardsRow's card links resolve correctly without any URL rewriting.
export const PATHS = {
  dashboard: '/',
  readiness: '/readiness-queue',
  history: '/run-history',
  import: '/import',
  building: '/import/building',
  deployment: '/deployment',
  fix: (objectId: string = ':objectId') => `/readiness-queue/fix/${objectId}`,
  flow: (modelId: string = ':modelId') => `/readiness-queue/flow/${modelId}`,
} as const
