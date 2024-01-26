import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { AddBank, Bank } from 'src/assets/interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../services/bank.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent {
  bankForm: FormGroup;
  static onlyNumbers(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {
      return { 'onlyNumbers': true };
    }
    return null;
  }

  static numbersAndUpperCaseLetters(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value && !/^[0-9A-Z]+$/.test(value)) {
      return { 'numbersAndUpperCaseLetters': true };
    }
    return null;
  }

  constructor(private dialogRef: MatDialogRef<AddBankComponent>, private userService: UserService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) private data: Bank, private bankService: BankService) {
    this.bankForm = this.fb.group({
      bank_name: ['', [Validators.required]],
      routing_number: ['', [Validators.required, AddBankComponent.onlyNumbers]],
      swift_bic: ['', [Validators.required, AddBankComponent.numbersAndUpperCaseLetters]],
    });
    if (data) {
      this.bankForm.setValue({
        bank_name: data.bank_name,
        routing_number: data.routing_number,
        swift_bic: data.swift_bic
      });
    }
  }

  onSubmit() {
    if(this.data) {
      if (this.bankForm.valid) {
        let bank: AddBank = this.bankForm.value;
        bank.id = this.data.id
        this.bankService.changeBank(bank).subscribe(() => {
          this.dialogRef.close();
        }) 
      }
    } else {
      if (this.bankForm.valid) {
        const bank: AddBank = this.bankForm.value;
        this.bankService.addBank(bank).subscribe(() => {
          this.dialogRef.close();
        }) 
      }
    }
    
  }
}
