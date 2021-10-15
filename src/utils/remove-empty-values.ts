export function removeEmptyValues(obj: {}) {
  return Object.entries(obj)
    .filter(([, v]) => !!v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}
