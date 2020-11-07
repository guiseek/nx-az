import { Observable } from 'rxjs'
import { AuthParams, AuthUser } from '../../models'

// type Params = { [P in keyof AuthParams]-?: AuthParams[P]; }

export abstract class IAuthUseCase {
  abstract login(param: AuthParams): Observable<AuthUser>
  abstract logout(): Observable<boolean>
}
