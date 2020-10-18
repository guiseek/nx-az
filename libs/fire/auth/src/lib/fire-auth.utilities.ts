export type FirebasePath = string | string[];

export function normalizePath(path: FirebasePath): string {
  return Array.isArray(path) ? path.join('/') : path;
}
