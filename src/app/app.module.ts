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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBankForUserComponent } from './add-bank-for-user/add-bank-for-user.component';
import { BankService } from './services/bank.service';
import { AddBankComponent } from './add-bank/add-bank.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    UserListComponent,
    BankListComponent,
    AddUserComponent,
    AddBankForUserComponent,
    AddBankComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UserService, MatDialog, BankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
