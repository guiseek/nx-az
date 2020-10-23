import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { A11yModule } from '@angular/cdk/a11y'
import { NgModule } from '@angular/core'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'

import { firebaseConfig } from './../environments/firebase-config'

import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { A11yFocusModule } from '@nx-a11y/focus'

import { AppRoutes } from './app.routing'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { FireModule } from './fire/fire.module'

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    AppRoutes,
    BrowserModule,
    A11yModule,
    A11yFocusModule,
    FireModule,

    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
