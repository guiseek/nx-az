import { MatFormFieldModule } from '@angular/material/form-field'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

import { A11yRoutes } from './a11y.routing'
import { A11yComponent } from './a11y.component'
import { FocusComponent } from './focus/focus.component'
import { RdfModelComponent } from './rdf-model/rdf-model.component'

import { A11yFocusModule } from '@nx-a11y/focus'
import { A11yFormsModule } from '@nx-a11y/forms'
import { FormsComponent } from './forms/forms.component'

@NgModule({
  imports: [
    CommonModule,
    A11yRoutes,
    A11yFocusModule,
    A11yFormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [
    A11yComponent,
    FocusComponent,
    FormsComponent,
    RdfModelComponent,
  ],
})
export class A11yModule {}
