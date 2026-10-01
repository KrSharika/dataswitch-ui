import { useEffect, useState } from 'react'
import type { ApiError } from '@/types/domain'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

// Minimal data-loading hook. Re-runs when `deps` change.
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    fn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((e: unknown) => {
        if (!cancelled) setState({ data: null, loading: false, error: e as ApiError })
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
