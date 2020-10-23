import { Auth, AuthParams, AuthUser } from '@nx-core/domain'
import { LoadUserByEmailRepository } from '../../protocols'

export class AuthLoginDb implements Auth {
  constructor(private readonly loadUserByEmail: LoadUserByEmailRepository) {}

  async login(params: AuthParams): Promise<AuthUser> {
    const user = await this.loadUserByEmail.loadByEmail(params.email)

    if (user) {
      return Promise.resolve(user)
    }
    throw new Error('Inválid credentials')
  }
}
