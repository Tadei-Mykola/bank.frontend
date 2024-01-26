import { Component } from '@angular/core';
import { Bank, User } from 'src/assets/interface';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { BankService } from '../services/bank.service';
import { AddBankComponent } from '../add-bank/add-bank.component';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent {
  public showBankList: boolean = false;
  public banks:Bank[] = [];

  constructor(private userService: UserService, private dialog: MatDialog, private bankService: BankService) {

  }
  ngOnInit(): void {
    this.getBanks()
  }

  private getBanks(): void {
    this.bankService.getAllBanks().subscribe((data: Bank[] | any) => {
      this.banks = []
      data.forEach((item: Bank) => {
        item.showUser = false;
        this.banks.push(item)
      });
    })
  }

  public toggleUserList(bank:Bank): void {
    bank.showUser = !bank.showUser;
    this.bankService.getAllBankUsers(bank.id).subscribe((data: Bank[] | any) => {
      bank.userBanks = data
    })
  }

  openDialogBank(bank?: Bank): void {
    const dialogRef = this.dialog.open(AddBankComponent, {
      data: bank
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBanks()
    });
  }


  public deleteBank(id: number): void {
    this.bankService.deleteBank(id).subscribe(() => this.getBanks())
  }

  public deleteBankForUser(user: User, bank: Bank): void {
    this.userService.deleteBank(user.id, bank.id).subscribe(() => bank.showUser = false)
  }
}
