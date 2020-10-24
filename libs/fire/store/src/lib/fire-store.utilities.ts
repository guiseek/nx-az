import { FireStorePath } from './fire-store.types'

export function normalizePath(path: FireStorePath): string {
  return Array.isArray(path) ? path.join('/') : path
}

export function generateUID(): string {
  function S4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }

  return S4() + S4()
}
