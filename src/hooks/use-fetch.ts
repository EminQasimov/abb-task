import { useCallback, useEffect, useState } from "react"

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
      data: initialData ?? {},
      isError: false,
      error: null,
    }
  })

  const { isLoading, isError, error, data } = state

  const refetch = useCallback(
    async (onDone?: () => void) => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }))

      try {
        const data = await fetch(url, fetchOptions).then((res) => res.json())

        setState(() => ({
          isError: false,
          isLoading: false,
          error: null,
          data,
        }))
        onSuccess()
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
          error,
        }))
      } finally {
        onDone?.()
      }
    },
    [url, queryEnabled, fetchOptions]
  )

  useEffect(() => {
    if (!queryEnabled) return

    refetch()
  }, [url, queryEnabled])

  return {
    isLoading,
    data,
    error,
    isError,
    refetch,
  }
}
