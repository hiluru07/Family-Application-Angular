import { Component, OnInit, Pipe } from '@angular/core';
import { MemberDashboardService } from '../../Services/member-dashboard-service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { AdminService } from '../../Services/admin-service';
import { Loading } from '../../Services/loading';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-member-dashboard',
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './member-dashboard.html',
  styleUrl: './member-dashboard.css'
})
export class MemberDashboard implements OnInit {
  constructor(private service: MemberDashboardService, private adminservice: AdminService, private memberservice: MemberDashboardService, private loading: Loading) { }

  imageBaseUrl = environment.IMAGE_BASE_URL;

  array: any[] = []
  adminData: any = {}

  AdminInfo() {
    this.adminservice.AdminInfo().subscribe(res => {
      this.adminData = res;
    })
  }
  searchData(searchText: string) {
    this.memberservice.Search(searchText).subscribe(res => {
      this.array = res;
    });
  }
  ngOnInit(): void {
    this.loading.show();
    this.service.ShowAllMembers().subscribe(data => {
      this.array = data;
      this.loading.hide()
    })
    this.AdminInfo();
  }
}
