import { useCallback, useEffect, useState } from "react"

type HookProps = {
  queryEnabled?: boolean
  url: string
  initialData?: any
  fetchOptions?: RequestInit
  onSuccess?: () => void
}

export default function useFetch(props: HookProps) {
  const {
    url,
    queryEnabled,
    initialData,
    fetchOptions,
    onSuccess = () => {},
  } = props

  const [state, setState] = useState(() => {
    return {
      isLoading: false,
      data: initialData ?? {},
      isError: false,
      error: null,
    }
  })

  const { isLoading, isError, error, data } = state

  const refetch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }))

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        setState(() => ({
          isError: false,
          isLoading: false,
          error: null,
          data,
        }))
        onSuccess()
      })
      .catch((e) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isError: true,
          error: e,
        }))
      })
  }, [url, queryEnabled])

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
