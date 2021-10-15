export function changeUrlParamsSilently(key: string, value: string) {
  if (!window) return

  const url = new URL(window.location.href)
  url.searchParams.set(key, value)

  if (!value) {
    url.searchParams.delete(key)
  }

  window.history.pushState({}, "", url.toString())
}
