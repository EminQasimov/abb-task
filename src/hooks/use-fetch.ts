/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useState } from 'react'

type HookProps = {
  queryEnabled?: boolean
  url: string
  initialData?: any
  fetchOptions?: RequestInit
  onSuccess?: () => void
}

type HookState = {
  isLoading: boolean
  data: any
  isError: boolean
  error: any
}

/**
 * @description my simple 😎 use-query alternative hook for dealing with
 * data fetching states.
 */
export default function useFetch(props: HookProps) {
  const {
    url,
    queryEnabled,
    initialData,
    fetchOptions,
    onSuccess = () => {},
  } = props

  const [state, setState] = useState<HookState>(() => {
    return {
      isLoading: false,
      isError: false,
      error: null,
      data: initialData ?? {},
    }
  })

  const { isLoading, isError, error, data } = state

  function update(args: Record<string, unknown>) {
    setState((prev) => ({
      ...prev,
      ...args,
    }))
  }

  const refetch = useCallback(
    async (onDone?: () => void) => {
      update({
        isLoading: true,
      })

      try {
        const data = await fetch(url, fetchOptions).then((res) => res.json())

        update({
          isError: false,
          isLoading: false,
          error: null,
          data,
        })

        onSuccess()
      } catch (error) {
        update({
          isLoading: false,
          isError: true,
          error,
          data: [],
        })
      } finally {
        onDone?.()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, fetchOptions]
  )

  useEffect(() => {
    if (!queryEnabled) return

    refetch()
  }, [queryEnabled, refetch])

  return {
    isLoading,
    data,
    error,
    isError,
    refetch,
  }
}
