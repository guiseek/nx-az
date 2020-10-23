import { Observable } from 'rxjs'
import { User } from '../../entities'

export abstract class IUserUseCase {
  abstract login(param: User): Observable<User>
  abstract logout(): Observable<boolean>
}
