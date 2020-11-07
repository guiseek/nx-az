import { AuthParams, AuthUser } from '@nx-core/domain'
import { Observable } from 'rxjs'
// import { Observable } from 'rxjs'

export abstract class AuthLoginRepository {
  abstract login(params: AuthParams): Observable<AuthUser>
  abstract logout(): Observable<boolean>
  // abstract login(params: AuthParams): Observable<AuthUser>
}
