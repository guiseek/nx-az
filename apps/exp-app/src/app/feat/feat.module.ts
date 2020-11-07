import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

import { FeatAuthModule } from '@nx-feat/auth'

import { FeatComponent } from './feat.component'
import { AuthComponent } from './auth/auth.component'
import { AuthUseCase } from '@nx-core/domain'
import { swapProvider } from '@nx-feat/auth'
import { FireAuthService } from '@nx-fire/auth'

const routes: Routes = [
  { path: '', component: FeatComponent },
  { path: 'auth', component: AuthComponent },
]

@NgModule({
  declarations: [FeatComponent, AuthComponent],
  imports: [CommonModule, FeatAuthModule, RouterModule.forChild(routes)],
  exports: [AuthComponent],
  providers: [swapProvider(AuthUseCase, FireAuthService)],
})
export class FeatModule {}
