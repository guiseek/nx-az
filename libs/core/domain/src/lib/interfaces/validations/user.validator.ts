import { User } from '../../entities/user'
import { ValidationResult } from './validator'

export abstract class IUserValidator {
  abstract validateFields(param: User): ValidationResult
}
