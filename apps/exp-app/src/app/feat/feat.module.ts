import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { FeatAuthModule } from '@nx-feat/auth'

import { FeatComponent } from './feat.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  { path: '', component: FeatComponent },
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  declarations: [FeatComponent, AuthComponent],
  imports: [CommonModule, FeatAuthModule, RouterModule.forChild(routes)],
  exports: [AuthComponent],
})
export class FeatModule {}
