import { InjectionToken } from '@angular/core'

export type AuthErrorContainer = 'subscribe' | 'snackbar'

export interface FeatAuthOptions {
  errors: AuthErrorContainer
}

export const FEAT_AUTH_VALUES: FeatAuthOptions = {
  errors: 'snackbar',
}

export const FEAT_AUTH_OPTIONS = new InjectionToken<FeatAuthOptions>(
  'feat-auth.options',
  {
    factory: () => FEAT_AUTH_VALUES,
  }
)
