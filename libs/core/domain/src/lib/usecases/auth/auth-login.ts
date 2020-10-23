import { AuthParams } from '../../models/auth-params'
import { AuthUser } from '../../models/auth-user'

export interface Auth {
  login: (params: AuthParams) => Promise<AuthUser>
}
