import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FireRoutes } from './fire.routing';
import { FireComponent } from './fire.component';
import { AuthComponent } from './auth/auth.component';
import { FireAuthModule } from '@nx-fire/auth';

@NgModule({
  imports: [
    CommonModule,
    FireRoutes,
    FireAuthModule.forRoot({}, [
      ['auth/invalid-email', 'Nhauhauhauhahu ananina não!'],
      ['auth/too-many-requests', 'Você adicionou']
    ]),
    ReactiveFormsModule
  ],
  declarations: [FireComponent, AuthComponent]
})
export class FireModule { }
