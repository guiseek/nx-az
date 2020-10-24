import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'a11y',
    loadChildren: () => import('./a11y/a11y.module').then((m) => m.A11yModule),
  },
  {
    path: 'fire',
    loadChildren: () => import('./fire/fire.module').then((m) => m.FireModule),
  },
  {
    path: 'feat',
    loadChildren: () => import('./feat/feat.module').then((m) => m.FeatModule),
  },
]

export const AppRoutes = RouterModule.forRoot(routes)
