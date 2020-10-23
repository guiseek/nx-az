import { AuthUser } from '@nx-core/domain'

export abstract class LoadUserByEmailRepository {
  abstract loadByEmail(email: string): Promise<AuthUser>
}
