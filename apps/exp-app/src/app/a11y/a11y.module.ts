import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yRoutes } from './a11y.routing';
import { A11yComponent } from './a11y.component';
import { FocusComponent } from './focus/focus.component';
import { RdfModelComponent } from './rdf-model/rdf-model.component';

import { A11yFocusModule } from '@nx-a11y/focus';

@NgModule({
  imports: [
    CommonModule,
    A11yRoutes,
    A11yFocusModule
  ],
  declarations: [A11yComponent, FocusComponent, RdfModelComponent]
})
export class A11yModule { }
