import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../Services/admin-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-info',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-info.html',
  styleUrl: './admin-info.css'
})
export class AdminInfo implements OnInit {

  EditForm!: FormGroup;
  admin: any = {};
  SelectedFile: File | null = null;
  preview: string = "assets/defaultImage.png";
  imageBaseUrl = environment.IMAGE_BASE_URL;

  @ViewChild('EditModal') EditModal!: ElementRef;
  modal: any;

  constructor(private service: AdminService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.EditForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.service.AdminInfo().subscribe(res => {
      setTimeout(() => {
        this.admin = res;

        this.preview = res.profileImage
          ? this.imageBaseUrl + "/Images/" + res.profileImage
          : "assets/defaultImage.png";
      });
    });

  }

  // VALIDATION GETTERS
  get username() { return this.EditForm.get('username')!; }
  get fname() { return this.EditForm.get('fname')!; }
  get lname() { return this.EditForm.get('lname')!; }
  get phone() { return this.EditForm.get('phone')!; }
  get email() { return this.EditForm.get('email')!; }

  // OPEN MODAL
  openModal() {
    this.modal = new bootstrap.Modal(this.EditModal.nativeElement);
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  // EDIT ADMIN
  EditAdmin(data: any) {
    this.EditForm.patchValue({
      id: data.id,
      username: data.username,
      fname: data.fname,
      lname: data.lname,
      phone: data.phone,
      email: data.email
    });

    this.preview = data.profileImage
      ? this.imageBaseUrl + "/Images/" + data.profileImage
      : "assets/defaultImage.png";
    console.log("Preview URL:", this.preview);

    this.openModal();
  }

  // IMAGE SELECT
  onSelectedFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.SelectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.preview = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  // SUBMIT
  submit() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched();
      return;
    }

    const id = this.EditForm.value.id;
    const fd = new FormData();

    if (this.SelectedFile) {
      fd.append("ProfileImage", this.SelectedFile);
    }

    fd.append("Username", this.username.value);
    fd.append("Fname", this.fname.value);
    fd.append("Lname", this.lname.value);
    fd.append("Phone", this.phone.value);
    fd.append("Email", this.email.value);

    this.service.UpdateAdmin(id, fd).subscribe(() => {
      this.closeModal();
      location.reload();
    });
  }
  canDeactivate(): boolean {
    const leave = confirm('Are you sure you want to leave this page?')

    if (leave) {
      if (!this.route.url.startsWith('/admin-dashboard')) {
        localStorage.clear();
      }
    }
    return leave;
  }
}
