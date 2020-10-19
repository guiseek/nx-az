import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FireAuthModule } from '@nx-fire/auth'

import { FireRoutes } from './fire.routing'
import { FireComponent } from './fire.component'
import { AuthComponent } from './auth/auth.component'
import { AuthLoginComponent } from './auth/auth-login'
import { AuthCreateComponent } from './auth/auth-create'

@NgModule({
  imports: [
    CommonModule,
    FireRoutes,
    FireAuthModule.forRoot({}, [
      ['auth/invalid-email', 'O email informado não é um endereço válido!']
    ]),
    ReactiveFormsModule,
  ],
  declarations: [
    FireComponent,
    AuthComponent,
    AuthCreateComponent,
    AuthLoginComponent,
  ],
})
export class FireModule {}
