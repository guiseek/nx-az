import { FeatAuthModule } from '@nx-feat/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { MatCardModule } from '@angular/material/card'

import { FormRoutingModule } from './form-routing.module'
import { FormComponent } from './form.component'

const routes: Routes = [{ path: '', component: FormComponent }]

@NgModule({
  declarations: [FormComponent],
  exports: [FormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FeatAuthModule,
    FormRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class FormModule {}
