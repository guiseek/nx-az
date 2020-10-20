import { Routes, RouterModule } from '@angular/router'
import { A11yComponent } from './a11y.component'
import { FocusComponent } from './focus/focus.component'
import { FormsComponent } from './forms/forms.component'
import { RdfModelComponent } from './rdf-model/rdf-model.component'

const routes: Routes = [
  { path: '', component: A11yComponent },
  { path: 'focus', component: FocusComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'rdf-model', component: RdfModelComponent },
]

export const A11yRoutes = RouterModule.forChild(routes)
