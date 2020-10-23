import { User } from '../../entities/user'

interface ValidationResult {
  errors: string[]
}

export abstract class IUserValidator {
  abstract validateFields(param: User): ValidationResult
}
