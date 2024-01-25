import { Component, OnInit } from '@angular/core';
import { Bank, User } from 'src/assets/interface';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers
    });
  }

  public deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.getUsers())
  }

  public deleteBank(user: User, id_bank: number): void {
    this.userService.deleteBank(user.id, id_bank).subscribe(() => user.showBank = false)
  }

  public addBank(user: User, bank_name: string) {
    this.userService.addBank({user_id: user.id, bank_name: bank_name}).subscribe(() => user.showBank = false)
  }
}
