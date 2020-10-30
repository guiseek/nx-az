import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { FireStoreModule } from '@nx-fire/store'
import { FireAuthGuard, FireAuthModule } from '@nx-fire/auth'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import {
  AngularFireAuthGuardModule,
  canActivate,
} from '@angular/fire/auth-guard'

const firebaseConfig = {
  apiKey: 'AIzaSyCpiGoZzt0jk-_GAaw18ZRpJHu_DwbkpW4',
  authDomain: 'hackfestbrasil.firebaseapp.com',
  databaseURL: 'https://hackfestbrasil.firebaseio.com',
  projectId: 'hackfestbrasil',
  storageBucket: 'hackfestbrasil.appspot.com',
  messagingSenderId: '704817394372',
  appId: '1:704817394372:web:066fdd2c4cf49fc3fbcf91',
  measurementId: 'G-J8KLKQQTXD',
}

const routeConfig = [
  {
    path: '',
    ...canActivate(FireAuthGuard.redirectTo(['form'])),
    component: HomeComponent,
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'admin',
    canActivate: [FireAuthGuard.isAuth],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
]

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAuthGuardModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,

    FireAuthModule.forRoot({
      users: {
        collectionId: 'users',
      },
      providers: ['google'],
    }),
    FireStoreModule,

    RouterModule.forRoot(routeConfig, { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
