import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { OverlayModule } from '@angular/cdk/overlay'
import { A11yModule as CdkA11yModule } from '@angular/cdk/a11y'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

import { A11yRoutes } from './a11y.routing'
import { A11yComponent } from './a11y.component'
import { FocusComponent } from './focus/focus.component'
import { ColorsComponent } from './colors/colors.component'
import { RdfModelComponent } from './rdf-model/rdf-model.component'

import { A11yFocusModule } from '@nx-a11y/focus'
import { A11yFormsModule } from '@nx-a11y/forms'
import { FormsComponent } from './forms/forms.component'

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    CdkA11yModule,
    A11yRoutes,
    A11yFocusModule,
    A11yFormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  declarations: [
    A11yComponent,
    FocusComponent,
    FormsComponent,
    RdfModelComponent,
    ColorsComponent,
  ],
})
export class A11yModule {}
