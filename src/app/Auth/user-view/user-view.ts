import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Userview } from '../../Services/userview';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-view.html',
  styleUrl: './user-view.css'
})
export class UserView implements OnInit {

  // PROFILE
  profilepath: string = '';
  username: string | null = '';
  Fname: string | null = '';
  Lname: string | null = '';
  Phone: string | null = '';
  Email: string | null = '';
  imageBaseUrl = environment.IMAGE_BASE_URL;
  

  // MEMBERS
  members: any[] = [];
  Relations = ['Son', 'Daughter', 'Spouse', 'Mother', 'Father'];

  // ---------- ADD MEMBER ----------
  @ViewChild('AddMemberModal') AddMemberModal!: ElementRef;
  addMemberModalInstance: any;
  AddMemberForm!: FormGroup;
  addMemberPreview: string = 'assets/defaultImage.jpg';
  addSelectedFile: File | null = null;

  // ---------- EDIT MEMBER ----------
  @ViewChild('EditMemberModal') EditMemberModal!: ElementRef;
  editMemberModalInstance: any;
  EditMemberForm!: FormGroup;
  editMemberPreview: string = 'assets/defaultImage.jpg';
  editSelectedFile: File | null = null;

  // ---------- EDIT PROFILE ----------
  @ViewChild('EditProfileModal') EditProfileModal!: ElementRef;
  editProfileModalInstance: any;
  EditProfileForm!: FormGroup;
  selectedProfileImage: File | null = null;
  ImagePreview: string = '';

  constructor(private fb: FormBuilder, private service: Userview, private route: Router) {
    // Initialize forms here using fb (so fb is available)
    this.AddMemberForm = this.fb.group({
      id: [0],
      profile: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required]
    });

    this.EditMemberForm = this.fb.group({
      id: [0],
      profile: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required]
    });

    this.EditProfileForm = this.fb.group({
      username: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      profileImage: [null]
    });
  }

  ngOnInit(): void {
    this.loadProfileFromLocalStorage();
    this.loadMembers();
  }

  // ----------------- Load Data -----------------
  loadProfileFromLocalStorage() {
    this.username = localStorage.getItem('username');
    this.Fname = localStorage.getItem('fname');
    this.Lname = localStorage.getItem('lname');
    this.Phone = localStorage.getItem('phone');
    this.Email = localStorage.getItem('email');
    const profile = localStorage.getItem('profile');
    this.profilepath = profile ? this.imageBaseUrl + profile : 'assets/defaultImage.jpg';
  }

  loadMembers() {
    this.service.GetMember().subscribe({
      next: (data: any) => {
        this.members = data || [];
      },
      error: (err) => {
        console.error('Failed to load members', err);
        this.members = [];
      }
    });
  }

  getMemberImage(member: any) {
    if (!member || !member.imageUrl || member.imageUrl === 'DefaultImage.jpg') {
      return this.imageBaseUrl +'/DefaultImage/DefaultImage.jpg';
    }
    return this.imageBaseUrl + '/images/' + member.imageUrl;
  }

  // ----------------- ADD MEMBER -----------------
  openAddMemberModal() {
    this.AddMemberForm.reset({ id: 0, profile: '', name: '', age: '', gender: '', relation: '' });
    this.addMemberPreview = 'assets/defaultImage.jpg';
    this.addSelectedFile = null;

    this.addMemberModalInstance = new bootstrap.Modal(this.AddMemberModal.nativeElement);
    this.addMemberModalInstance.show();
  }

  closeAddMemberModal() {
    if (this.addMemberModalInstance) this.addMemberModalInstance.hide();
  }

  onAddMemberFileSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    this.addSelectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.addMemberPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  removeAddMemberImage() {
    this.addMemberPreview = 'assets/defaultImage.jpg';
    this.addSelectedFile = null;
    this.AddMemberForm.patchValue({ profile: '' });
  }

  submitAddMemberForm() {
    if (this.AddMemberForm.invalid) {
      this.AddMemberForm.markAllAsTouched();
      return;
    }

    const fd = new FormData();
    // Use safe defaults to avoid undefined being passed to FormData.append
    fd.append('Id', localStorage.getItem('id') || '0');
    fd.append('Name', this.AddMemberForm.value.name || '');
    fd.append('Age', (this.AddMemberForm.value.age != null) ? this.AddMemberForm.value.age.toString() : '0');
    fd.append('Gender', this.AddMemberForm.value.gender || '');
    fd.append('Relation', this.AddMemberForm.value.relation || '');

    if (this.addSelectedFile) {
      fd.append('MemberImage', this.addSelectedFile, this.addSelectedFile.name);
    }

    this.service.InsertMember(fd).subscribe({
      next: () => {
        alert('Member added successfully');
        this.loadMembers();
        this.closeAddMemberModal();
      },
      error: (err) => {
        console.error('InsertMember error', err);
        alert('Failed to add member');
      }
    });
  }

  // ----------------- EDIT MEMBER -----------------
  openEditMemberModal(member: any) {
    this.EditMemberForm.patchValue({
      id: member.id ?? 0,
      profile: '',
      name: member.name ?? '',
      age: member.age ?? '',
      gender: member.gender ?? '',
      relation: member.relation ?? ''
    });

    this.editMemberPreview = (!member.imageUrl || member.imageUrl === 'DefaultImage.jpg')
      ? 'assets/defaultImage.jpg'
      : this.imageBaseUrl +'/images/' + member.imageUrl;

    this.editSelectedFile = null;
    this.editMemberModalInstance = new bootstrap.Modal(this.EditMemberModal.nativeElement);
    this.editMemberModalInstance.show();
  }

  closeEditMemberModal() {
    if (this.editMemberModalInstance) this.editMemberModalInstance.hide();
  }

  onEditMemberFileSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    this.editSelectedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.editMemberPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  removeEditMemberImage() {
    this.editMemberPreview = 'assets/defaultImage.jpg';
    this.editSelectedFile = null;
    this.EditMemberForm.patchValue({ profile: '' });
  }

  submitEditMemberForm() {
    if (this.EditMemberForm.invalid) {
      this.EditMemberForm.markAllAsTouched();
      return;
    }

    const fd = new FormData();
    fd.append('Name', this.EditMemberForm.value.name || '');
    fd.append('Age', (this.EditMemberForm.value.age != null) ? this.EditMemberForm.value.age.toString() : '0');
    fd.append('Gender', this.EditMemberForm.value.gender || '');
    fd.append('Relation', this.EditMemberForm.value.relation || '');

    if (this.editSelectedFile) {
      fd.append('MemberImage', this.editSelectedFile, this.editSelectedFile.name);
    }

    const memberId = this.EditMemberForm.value.id ?? 0;
    this.service.ModifyMember(memberId, fd).subscribe({
      next: () => {
        alert('Member updated successfully');
        this.loadMembers();
        this.closeEditMemberModal();
      },
      error: (err) => {
        console.error('ModifyMember error', err);
        alert('Failed to update member');
      }
    });
  }

  // ----------------- DELETE MEMBER -----------------
  deleteMember(id: number) {
    if (!confirm('Are you sure to delete this member?')) return;

    this.service.RemoveMember(id).subscribe({
      next: () => {
        this.members = this.members.filter(m => m.id !== id);
      },
      error: (err) => {
        console.error('RemoveMember error', err);
        alert('Failed to delete member');
      }
    });
  }

  // ----------------- EDIT PROFILE -----------------
  openEditProfileModal() {
    this.EditProfileForm.patchValue({
      username: this.username ?? '',
      fname: this.Fname ?? '',
      lname: this.Lname ?? '',
      phone: this.Phone ?? '',
      email: this.Email ?? ''
    });

    this.ImagePreview = this.profilepath || 'assets/defaultImage.jpg';
    this.editProfileModalInstance = new bootstrap.Modal(this.EditProfileModal.nativeElement);
    this.editProfileModalInstance.show();
  }

  closeEditProfileModal() {
    if (this.editProfileModalInstance) this.editProfileModalInstance.hide();
  }

  onProfileImageSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    this.selectedProfileImage = file;
    const reader = new FileReader();
    reader.onload = () => (this.ImagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  updateProfile() {
    if (this.EditProfileForm.invalid) {
      this.EditProfileForm.markAllAsTouched();
      return;
    }

    const fd = new FormData();
    fd.append('Username', this.EditProfileForm.value.username || '');
    fd.append('Fname', this.EditProfileForm.value.fname || '');
    fd.append('Lname', this.EditProfileForm.value.lname || '');
    fd.append('Phone', this.EditProfileForm.value.phone || '');
    fd.append('Email', this.EditProfileForm.value.email || '');

    if (this.selectedProfileImage) {
      fd.append('ProfileImage', this.selectedProfileImage, this.selectedProfileImage.name);
    }

    const id = Number(localStorage.getItem('id') || 0);
    this.service.UpdateUser(id, fd).subscribe({
      next: (res: any) => {
        alert('Profile updated successfully');
        localStorage.setItem('username', this.EditProfileForm.value.username || '');
        localStorage.setItem('fname', this.EditProfileForm.value.fname || '');
        localStorage.setItem('lname', this.EditProfileForm.value.lname || '');
        localStorage.setItem('phone', this.EditProfileForm.value.phone || '');
        localStorage.setItem('email', this.EditProfileForm.value.email || '');
        if (res && res.profileImage) {
          localStorage.setItem('profile', res.profileImage);
          this.profilepath = this.imageBaseUrl + res.profileImage;
        } else {
          this.loadProfileFromLocalStorage();
        }
        this.closeEditProfileModal();
      },
      error: (err) => {
        console.error('UpdateUser error', err);
        alert('Failed to update profile');
      }
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
