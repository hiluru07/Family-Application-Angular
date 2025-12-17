import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FamilyheadData } from '../../Services/familyhead-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-family-head',
  imports: [RouterLink, CommonModule],
  templateUrl: './family-head.html',
  styleUrl: './family-head.css'
})
export class FamilyHead implements OnInit {
  constructor(private service: FamilyheadData, private route: Router) { }

  array: any[] = [];
  imageBaseUrl = environment.IMAGE_BASE_URL;

  ngOnInit(): void {
    this.GetHeadMembers()
  }

  GetHeadMembers() {
    this.service.GetAllHead().subscribe(data => {
      this.array = data;
    })
  }
  DeleteHead(id: number) {
    this.service.RemoveHead(id).subscribe(data => {
      this.array = data;
      this.GetHeadMembers();
    })
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
