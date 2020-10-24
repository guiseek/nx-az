import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { FireAuthModule } from '@nx-fire/auth'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'

import { FeatAuthComponent } from './feat-auth/feat-auth.component'
import { FeatAuthFormComponent } from './feat-auth-form/feat-auth-form.component'
import { FeatAuthContainer } from './containers/feat-auth.container'
import { FeatAuthProviderDirective } from './providers/feat-auth-provider.directive'

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatButtonModule,

    FireAuthModule,

    ReactiveFormsModule,
  ],
  declarations: [
    FeatAuthComponent,
    FeatAuthFormComponent,
    FeatAuthContainer,
    FeatAuthProviderDirective,
  ],
  exports: [
    FeatAuthComponent,
    FeatAuthFormComponent,
    FeatAuthContainer,
    FeatAuthProviderDirective,
  ],
})
export class FeatAuthModule {}
