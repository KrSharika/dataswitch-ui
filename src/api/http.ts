import { API_BASE_URL } from '@/config/apiConfig'
import type { ApiError } from '@/types/domain'

// Used once real endpoints exist. Throws an ApiError ({ code, message }) on failure.
export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, init)
  if (!res.ok) {
    let err: ApiError = { code: String(res.status), message: res.statusText }
    try {
      err = (await res.json()) as ApiError
    } catch {
      // response had no JSON body; keep the status-based error
    }
    throw err
  }
  return (await res.json()) as T
}
