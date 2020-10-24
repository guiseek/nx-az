import { none } from './fire-auth.types'

export interface AuthWithEmailAndPassword {
  email: string
  password: string
}

export interface FireAuthUser {
  name: string | none
  email: string | none
  photo: string | none
  phone: string | none
}
