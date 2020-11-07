import { AuthParams } from '../../models/auth-params'
import { AuthUser } from '../../models/auth-user'

export interface AuthLogin {
  login: (params: AuthParams) => Promise<AuthUser>
}
