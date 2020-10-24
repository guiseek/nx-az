import { Routes, RouterModule } from '@angular/router'
import { FireComponent } from './fire.component'
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  { path: '', component: FireComponent },
  { path: 'auth', component: AuthComponent },
]

export const FireRoutes = RouterModule.forChild(routes)
