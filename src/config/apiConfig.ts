// Single source for backend configuration (same pattern as the Data Switch Platform).
// Empty base URL = same-origin. Set VITE_API_BASE_URL in .env when the backend is ready.
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''
