import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../Services/admin-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Userview } from '../../Services/userview';
import { MemberDashboardService } from '../../Services/member-dashboard-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  array: any[] = [];
  Relations: any[] = ['Son', 'Daughter', 'Supose', 'Mother', 'Father'];
  EditForm: FormGroup;
  selectedFile: File | null = null;
  preview = "assets/defaultImage.jpg";
  isInsideDashboard = true;
  @ViewChild('EditMemberModal') EditMemberModal!: ElementRef;
  modal: any;

  constructor(
    private service: AdminService,
    private userservice: Userview,
    private memberservice: MemberDashboardService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.EditForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required],
      profile: ['']
    });
  }

  // Validation getters
  get name() { return this.EditForm.get('name'); }
  get age() { return this.EditForm.get('age'); }
  get gender() { return this.EditForm.get('gender'); }
  get relation() { return this.EditForm.get('relation'); }

  // modal control
  openModal() {
    this.modal = new bootstrap.Modal(this.EditMemberModal.nativeElement);
    this.modal.show();
  }
  closeModal() {
    this.modal.hide();
  }

  // load data
  loadAlluser() {
    this.service.showalluser().subscribe(data => {
      this.array = data;
    });
  }

  searchData(searchText: string) {
    this.memberservice.Search(searchText).subscribe(res => {
      this.array = res;
    });
  }

  GetEditMember(data: any) {
    this.EditForm.patchValue({
      id: data.id,
      name: data.name,
      age: data.age,
      gender: data.gender,
      relation: data.relation,
    });

    if (data.imageUrl && data.imageUrl.toLowerCase() !== 'defaultimage.jpg') {
      this.preview = "https://localhost:7093/Images/" + data.imageUrl;
    } else {
      this.preview = "https://localhost:7093/DefaultImage/DefaultImage.jpg";
    }

    this.selectedFile = null;
    this.openModal();
  }

  onSelectedFile(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = e => this.preview = (e.target as any)?.result;
    reader.readAsDataURL(file);
  }

  removeMemberImage() {
    this.preview = "https://localhost:7093/DefaultImage/DefaultImage.jpg";
    this.selectedFile = null;

    this.EditForm.patchValue({
      profile: '',
      MemberImage: null
    });
  }

  submitForm() {
    if (this.EditForm.invalid) {
      this.EditForm.markAllAsTouched();
      return;
    }

    const id = this.EditForm.value.id;

    const fd = new FormData();

    if (this.selectedFile instanceof File) {
      fd.append("MemberImage", this.selectedFile, this.selectedFile.name);
    }

    fd.append("Name", this.EditForm.value.name);
    fd.append("Age", String(this.EditForm.value.age));
    fd.append("Gender", this.EditForm.value.gender);
    fd.append("Relation", this.EditForm.value.relation);

    const isPreviewDefault = this.preview.includes('defaultImage') || this.preview.endsWith('/default.png');
    if (!this.selectedFile && isPreviewDefault) {
      fd.append("removeImage", "true");
    }

    this.userservice.ModifyMember(id, fd).subscribe({
      next: () => {
        alert("Member updated successfully!");
        this.closeModal();
        this.loadAlluser();
      },
      error: err => {
        console.error("Update member error", err);
        alert("Update failed. Check console.");
      }
    });
  }

  DeleteMember(id: number) {
    if (!confirm("Are you sure? Delete this member?")) return;
    this.service.RemoveMember(id).subscribe({
      next: (res) => {
        console.log(res);
        alert("Deleted successfully!");
        this.loadAlluser(); 
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  canLeave: boolean = false;

  canDeactivate(): boolean {
    if (!this.canLeave) {
      return confirm('Are you sure you want to leave this page?');
    }
    return true;
  }

  leavePage() {
    this.canLeave = true;
  }
  ngOnInit(): void {
    this.loadAlluser();
  }
}
