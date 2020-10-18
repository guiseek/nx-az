import { BrowserModule } from '@angular/platform-browser';
import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';

import { A11yFocusModule } from '@nx-a11y/focus';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [AppRoutes, BrowserModule, A11yModule, A11yFocusModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
