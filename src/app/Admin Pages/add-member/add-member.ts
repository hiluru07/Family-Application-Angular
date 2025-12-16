import { Component, OnInit } from '@angular/core';
import { Userview } from '../../Services/userview';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../Services/admin-service';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-member.html',
  styleUrls: ['./add-member.css']
})
export class AddMember implements OnInit {

  AddMembersForm!: FormGroup;
  Relations = ['Son', 'Daughter', 'Spouse', 'Mother', 'Father'];

  familyHeadId = 0;

  selectedFiles: File[] = [];
  previews: string[] = [];

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.familyHeadId = Number(this.route.snapshot.paramMap.get('id'));

    this.AddMembersForm = this.fb.group({
      items: this.fb.array([this.createFields()])
    });
  }

  get items(): FormArray {
    return this.AddMembersForm.get('items') as FormArray;
  }

  createFields(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      relation: ['', Validators.required]
    });
  }

  AddFields() {
    this.items.push(this.createFields());
  }

  removeFields(index: number) {
    this.items.removeAt(index);
    this.previews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onSelectedFile(event: any, index: number) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFiles[index] = file;

    const reader = new FileReader();
    reader.onload = () => this.previews[index] = reader.result as string;
    reader.readAsDataURL(file);
  }

  submit() {

    if (this.AddMembersForm.invalid) {
      this.AddMembersForm.markAllAsTouched();
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("UserId", this.familyHeadId.toString());

    this.items.controls.forEach((item, index) => {
      formData.append(`Members[${index}].Name`, item.value.name);
      formData.append(`Members[${index}].Age`, item.value.age);
      formData.append(`Members[${index}].Gender`, item.value.gender);
      formData.append(`Members[${index}].Relation`, item.value.relation);

      if (this.selectedFiles[index]) {
        formData.append(`Members[${index}].MemberImage`, this.selectedFiles[index]);
      }
    });

    this.service.InsertMultipleMember(formData).subscribe({
      next: () => {
        alert("Members added successfully!");
        this.router.navigate(['/admin-dashboard']);
      },
      error: () => alert("Error adding members")
    });
  }
  canDeactivate(): boolean {
    const leave = confirm('Are you sure you want to leave this page?')

    if (leave) {
      if (!this.router.url.startsWith('/admin-dashboard')) {
        localStorage.clear();
      }
    }
    return leave;
  }
}
