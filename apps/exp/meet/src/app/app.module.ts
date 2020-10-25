import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { FeatMeetModule } from '@nx-feat/meet'

import { AppComponent } from './app.component'
import { RoomComponent } from './room/room.component'

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

@NgModule({
  declarations: [AppComponent, RoomComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,

    RouterModule.forRoot(
      [
        {
          path: '',
          component: RoomComponent,
        },
      ],
      { initialNavigation: 'enabled' }
    ),

    FeatMeetModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
