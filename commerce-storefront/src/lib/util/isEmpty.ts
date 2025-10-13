export const isObject = (input: unknown): input is Record<string, unknown> => {
  return input !== null && typeof input === 'object' && !Array.isArray(input)
}

export const isArray = <T = unknown>(input: unknown): input is T[] => {
  return Array.isArray(input)
}

export const isEmpty = (input: unknown): boolean => {
  if (input === null || input === undefined) return true
  
  if (typeof input === "string") return input.trim().length === 0
  
  if (isArray(input)) return input.length === 0
  
  if (isObject(input)) return Object.keys(input).length === 0
  
  return false
}
