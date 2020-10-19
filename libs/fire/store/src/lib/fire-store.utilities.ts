import { FireStorePath } from './fire-store.types';

export function normalizePath(path: FireStorePath): string {
  return Array.isArray(path) ? path.join('/') : path;
}
