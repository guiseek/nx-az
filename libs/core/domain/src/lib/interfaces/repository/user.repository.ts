import { Observable } from 'rxjs'
import { User } from '../../entities'
import { AuthParams, AuthUser } from '../../models'

export abstract class IUserRepository {
  abstract login(param: AuthParams): Observable<AuthUser>
  abstract logout(): Observable<boolean>
}
