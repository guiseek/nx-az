import { Observable } from 'rxjs'
import { User } from '../../entities'

export abstract class IUserController {
  abstract login(param: User): Observable<User>
  abstract logout(): Observable<boolean>
}
