import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { UserListComponent } from './user-list/user-list.component';
import { BankListComponent } from './bank-list/bank-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    UserListComponent,
    BankListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
