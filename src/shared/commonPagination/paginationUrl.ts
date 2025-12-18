import type { IPagintationData } from './types'

export const getPaginationUrl = (pagination: IPagintationData): string => {
  return `limit=${pagination.limit}&offset=${pagination.offset}`
}
