import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-bank-for-user',
  templateUrl: './add-bank-for-user.component.html',
  styleUrls: ['./add-bank-for-user.component.scss']
})
export class AddBankForUserComponent {
  public bankName: string = '';
  private userId: number;
  constructor(private dialogRef: MatDialogRef<AddBankForUserComponent>, private userService: UserService, @Inject(MAT_DIALOG_DATA) private data: { userId: number }){
    this.userId = data.userId;
  }

  onSubmit() {
    if(this.bankName.trim().length){
      this.userService.addBank(this.userId,this.bankName).subscribe(() => {
        this.dialogRef.close();
      }, error => console.error(error)) 
    }
      
  }
}

