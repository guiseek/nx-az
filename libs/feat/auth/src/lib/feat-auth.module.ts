import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'

import { FeatAuthContainer } from './containers/feat-auth.container'
import { FeatAuthComponent } from './feat-auth/feat-auth.component'
import { FeatAuthFormComponent } from './feat-auth-form/feat-auth-form.component'
import { FeatAuthProviderDirective } from './providers/feat-auth-provider.directive'

@NgModule({
  imports: [
    CommonModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,

    ReactiveFormsModule,
  ],
  declarations: [
    FeatAuthContainer,
    FeatAuthComponent,
    FeatAuthFormComponent,
    FeatAuthProviderDirective,
  ],
  exports: [
    FeatAuthContainer,
    FeatAuthComponent,
    FeatAuthFormComponent,
    FeatAuthProviderDirective,
  ],
})
export class FeatAuthModule {}
