import { InjectionToken } from '@angular/core'
export type AuthProvider = 'google' | 'github'

export interface FireAuthOptions {
  users?: {
    collectionId: string
  }
  providers?: AuthProvider[]
}

export const FIRE_AUTH_VALUES: FireAuthOptions = {
  users: {
    collectionId: 'users',
  },
  providers: [],
}

export const FIRE_AUTH_OPTIONS = new InjectionToken<FireAuthOptions>(
  'fire-auth.options',
  {
    factory: () => FIRE_AUTH_VALUES,
  }
)
