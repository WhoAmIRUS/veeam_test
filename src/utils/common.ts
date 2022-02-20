export const isObject = (value: unknown) => {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return true
  }

  return false
}
