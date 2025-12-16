import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginPage } from '../login-page/login-page';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordMatch } from '../../shared/passwordmatch';
import { CommonModule } from '@angular/common';
import { Register } from '../../Services/register';
import { Loading } from '../../Services/loading';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {

  RegisterForm: any;
  seletedFile: File | null = null
  preview: string = "assets/defaultImage.jpg";

  constructor(private fb: FormBuilder, private service: Register, private router: Router, private loading: Loading) {
    this.RegisterForm = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(4)]],
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      Email: [''],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)]],
      Cpassword: ['', Validators.required],
      ProfileImage: [null, Validators.required]

    }, { validators: PasswordMatch }
    );
  }

  get Username() {
    return this.RegisterForm.get('Username')
  }
  get Fname() {
    return this.RegisterForm.get('Fname')
  }
  get Lname() {
    return this.RegisterForm.get('Lname')
  }
  get Phone() {
    return this.RegisterForm.get('Phone')
  }
  get Email() {
    return this.RegisterForm.get('Email')
  }
  get Password() {
    return this.RegisterForm.get('Password')
  }
  get Cpassword() {
    return this.RegisterForm.get('Cpassword')
  }
  get ProfileImage() {
    return this.RegisterForm.get('ProfileImage');
  }

  isDirty = false;

  canDeactive() {
    if (this.isDirty) {
      return confirm("You have unsaved changes! Do you really want to exit?");
    }
    return true;
  }
  onFileSeleted(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.seletedFile = file;
    }
    const reader = new FileReader();
    reader.onload = e => this.preview = e.target?.result as string;
    reader.readAsDataURL(file)
  }
  submit() {
    if (this.RegisterForm.invalid) {
      this.loading.hide();

      this.RegisterForm.markAllAsTouched();
    }

    const fb = new FormData();
    fb.append("Username", this.RegisterForm.value.Username);
    fb.append("Fname", this.RegisterForm.value.Fname);
    fb.append("Lname", this.RegisterForm.value.Lname);
    fb.append("Phone", this.RegisterForm.value.Phone);

    if (this.RegisterForm.value.Email) {
      fb.append("Email", this.RegisterForm.value.Email);
    }

    fb.append("Password", this.RegisterForm.value.Password);
    fb.append("Cpassword", this.RegisterForm.value.Cpassword);
    fb.append("ProfileImage", this.seletedFile as File);

    this.service.Register(fb).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.log("Backend Error:", err.error)
    });
  }
}
