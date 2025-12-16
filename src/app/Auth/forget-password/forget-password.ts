import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ForgetPasswordService } from '../../Services/forget-password-service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPassword {
  LoginForm!: FormGroup;
  PasswordForm!: FormGroup;
  PasswordOpen: boolean = false;

  constructor(private fb: FormBuilder, private service: ForgetPasswordService, private router: Router) {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.PasswordForm = this.fb.group({
      id: [0],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    });
  }

  get username() { return this.LoginForm.get('username'); }
  get phone() { return this.LoginForm.get('phone'); }
  get password() { return this.PasswordForm.get('password'); }
  get cpassword() { return this.PasswordForm.get('cpassword'); }

  submit() {
    this.service.VerifyUser(this.LoginForm.value).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.PasswordOpen = true;
        this.PasswordForm.patchValue({
          id: res.userId
        });

        console.log("User ID set:", this.PasswordForm.value.id);
      },
      error: () => {
        alert("Invalid username or phone number");
        this.PasswordOpen = false;
      }
    });
  }

  SubmitPassword() {
    const body = {
      username: this.username?.value,
      phone: this.phone?.value,
      password: this.password?.value,
      cPassword: this.cpassword?.value
    };
    this.service.ForgetPassword(this.PasswordForm.value.id, body)
      .subscribe({
        next: (res) => {
          alert("Password updated");
          this.router.navigate(["login"]);
        },
        error: (err) => {
          console.log("Validation Error:", err.error);
          alert("Update failed");
        }
      });
  }
}
