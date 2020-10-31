import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { FeatAuthModule } from '@nx-feat/auth'

import { FeatComponent } from './feat.component'
import { AuthComponent } from './auth/auth.component'
import { FormsComponent } from './forms/forms.component'

const routes: Routes = [
  { path: '', component: FeatComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'forms', component: FormsComponent },
]

@NgModule({
  declarations: [FeatComponent, AuthComponent, FormsComponent],
  imports: [CommonModule, FeatAuthModule, RouterModule.forChild(routes)],
  exports: [AuthComponent],
})
export class FeatModule {}
