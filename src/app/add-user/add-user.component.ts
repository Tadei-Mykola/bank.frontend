import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser, User } from 'src/assets/interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<AddUserComponent>, private userService: UserService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) private data: User) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    if (data) {
      this.userForm.setValue({
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
      });
    }
  }

  onSubmit() {
    if(this.data) {
      if (this.userForm.valid) {
        let user: AddUser = this.userForm.value;
        user.id = this.data.id
        this.userService.changeUser(user).subscribe(() => {
          this.dialogRef.close();
        }) 
      }
    } else {
      if (this.userForm.valid) {
        const user: AddUser = this.userForm.value;        
        this.userService.addUser(user).subscribe(() => {
          this.dialogRef.close();
        }) 
      }
    }
    
  }

}
