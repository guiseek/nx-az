import { Observable } from 'rxjs'
import { User } from '../../entities'

export abstract class IUserRepository {
  abstract login(param: User): Observable<User>
  abstract logout(): Observable<boolean>
}
