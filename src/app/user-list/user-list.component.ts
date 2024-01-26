import { Component, OnInit } from '@angular/core';
import { Bank, User } from 'src/assets/interface';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddBankForUserComponent } from '../add-bank-for-user/add-bank-for-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public showBankList: boolean = false;
  public users:User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getUsers()
  }

  private getUsers(): void {
    this.userService.getAllUsers().subscribe((data: User[] | any) => {
      this.users = []
      data.forEach((item: User) => {
        item.showBank = false;
        this.users.push(item)
      });
    })
  }

  public toggleBankList(user:User): void {
    user.showBank = !user.showBank;
    this.userService.getAllUserBanks(user.id).subscribe((data: Bank[] | any) => {
      user.userBanks = data
    })
  }

  openDialogUser(user?: User): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    });
  }

  public openDialogAddBankForUser(user: User): void{
    const dialogRef = this.dialog.open(AddBankForUserComponent, {
      data: { userId: user.id },
    });

    dialogRef.afterClosed().subscribe(() => {
      user.showBank = false;
    });
  }

  public deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.getUsers())
  }

  public deleteBank(user: User, id_bank: number): void {
    this.userService.deleteBank(user.id, id_bank).subscribe(() => user.showBank = false)
  }

}
