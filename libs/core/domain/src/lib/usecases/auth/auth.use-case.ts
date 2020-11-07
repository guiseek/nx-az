import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs'
import { Injectable } from '@angular/core'

import { IAuthUseCase, IUserRepository, IAuthValidator } from '../../interfaces'
import { AuthParams, AuthUser } from '../../models'

@Injectable({
  providedIn: 'root',
})
export class AuthUseCase implements IAuthUseCase {
  loading = new BehaviorSubject<boolean>(false)
  loading$ = this.loading.asObservable()

  private user = new Subject<AuthUser>()
  user$ = this.user.asObservable()

  private error = new Subject<string>()
  error$ = this.error.asObservable()

  constructor(
    private userRepository: IUserRepository,
    private userValidator: IAuthValidator
  ) {}

  login(param: AuthParams): Observable<AuthUser> {
    const validator = this.userValidator.validateFields(param)

    if (!validator.errors?.length) {
      return this.userRepository.login(param)
    } else {
      return throwError(validator.errors)
    }
  }

  logout(): Observable<boolean> {
    return this.userRepository.logout()
  }
}
