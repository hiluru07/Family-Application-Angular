import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { RegisterPage } from '../register-page/register-page';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Services/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

  LoginForm: any

  constructor(private fb: FormBuilder, private service: Login, private router: Router) {
    this.LoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  get username() {
    return this.LoginForm.get('username')
  }
  get password() {
    return this.LoginForm.get('password')
  }
  success: string = ""
  message: string = ""
  submit() {
    this.service.Login(this.LoginForm.value).subscribe({
      next: (res) => {
        this.success = "Login success";
        if (res.role === "FamilyHead") {
          alert("Login Success");
        }
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("username", res.user);
        localStorage.setItem("profile", res.profileImage);
        localStorage.setItem("fname", res.fname);
        localStorage.setItem("lname", res.lname);
        localStorage.setItem("phone", res.phone);
        localStorage.setItem("email", res.email);
        localStorage.setItem("role", res.role);
        localStorage.setItem("status", res.status);
        localStorage.setItem("message", res.message);

        this.router.navigate(["status"])
      },
      error: (err) => {
        this.message = err.error;
        alert(err.error);
      }
    })
  }
}
