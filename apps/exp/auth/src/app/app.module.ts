import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { FireStoreModule } from '@nx-fire/store'
import { FireAuthModule, FireAuthService } from '@nx-fire/auth'
import { AuthUseCase } from '@nx-core/domain'
import { swapProvider } from '@nx-feat/auth'

import { AppComponent } from './app.component'
import { FormModule } from './form/form.module'

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
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,

    FireAuthModule.forRoot({
      users: {
        collectionId: 'users',
      },
      providers: ['google'],
    }),
    FireStoreModule,

    RouterModule.forRoot(routeConfig, { initialNavigation: 'enabled' }),

    FormModule,
  ],
  providers: [swapProvider(AuthUseCase, FireAuthService)],
  bootstrap: [AppComponent],
})
export class AppModule {}
