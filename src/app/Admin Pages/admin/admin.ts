import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, RouterLink, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  LoginForm: any;
  constructor(private fb: FormBuilder, private service: AdminService, private router: Router) {
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

  submit() {
    this.service.Login(this.LoginForm.value).subscribe({
      next: (res: any) => {
        if (res.role === "Admin") {
          alert("Login Success");
        }

        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("username", res.user);
        localStorage.setItem("role", res.role);

        this.router.navigate(["admin-dashboard"]);
      }
    });
  }

}
