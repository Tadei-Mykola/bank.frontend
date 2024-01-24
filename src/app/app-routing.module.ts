import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { BankListComponent } from './bank-list/bank-list.component';

const routes: Routes = [
  { path: 'userList', component: UserListComponent },
  { path: 'bankList', component: BankListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
