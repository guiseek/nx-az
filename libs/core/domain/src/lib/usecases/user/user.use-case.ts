import { Observable, throwError } from 'rxjs'
import { Injectable } from '@angular/core'

import { User } from '../../entities'
import { IUserUseCase, IUserRepository, IUserValidator } from '../../interfaces'
import { AuthParams, AuthUser } from '../../models'

@Injectable({
  providedIn: 'root',
})
export class UserUseCase implements IUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userValidator: IUserValidator
  ) {}

  login(param: User): Observable<User> {
    // const validator = this.userValidator.validateFields(param)
    const validator = { errors: [] }

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
