import { Auth, AuthParams, AuthUser } from '@nx-core/domain'
// import { Observable } from 'rxjs'

export abstract class AuthLoginRepository implements Auth {
  abstract login(params: AuthParams): Promise<AuthUser>
  // abstract login(params: AuthParams): Observable<AuthUser>
}
