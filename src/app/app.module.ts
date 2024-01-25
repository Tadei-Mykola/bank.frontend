import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { UserListComponent } from './user-list/user-list.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBankForUserComponent } from './add-bank-for-user/add-bank-for-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    UserListComponent,
    BankListComponent,
    AddUserComponent,
    AddBankForUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
