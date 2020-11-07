import { User } from '../../entities/user'
import { AuthParams } from '../../models'
import { ValidationResult } from './validator'

export abstract class IAuthValidator {
  abstract validateFields(param: AuthParams): ValidationResult
}
