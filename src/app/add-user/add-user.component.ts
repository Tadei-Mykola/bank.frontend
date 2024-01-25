import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUser } from 'src/assets/interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm: FormGroup;
  
  constructor(private dialogRef: MatDialogRef<AddUserComponent>, private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: AddUser = this.userForm.value;
      this.userService.addUser(user).subscribe(() => {
        this.dialogRef.close();
      }) 
    }
  }

}
