import { FireStoreQuery } from './fire-store.query'

export interface FireStoreCollectionConfig {
  collectionId: string
  path: string
}

export type FireStoreQueryConfig = Pick<
  FireStoreQuery,
  | 'where'
  | 'limit'
  | 'orderBy'
  | 'startAt'
  | 'startAfter'
  | 'endAt'
  | 'endBefore'
>

export function CollectionConfig<T extends new (...args: any[]) => {}>(
  options: FireStoreCollectionConfig
) {
  return (constructor: T) => {
    Object.keys(options).forEach((key) => {
      ;(constructor as any)[key] = (options as any)[key]
    })
  }
}

export abstract class FireStoreCollection {
  abstract collectionId: string
}
