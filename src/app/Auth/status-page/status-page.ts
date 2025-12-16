import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status-page',
  imports: [CommonModule],
  templateUrl: './status-page.html',
  styleUrl: './status-page.css'
})
export class StatusPage implements OnInit {

  constructor(private router: Router) { }

  username: string | null = ''
  status: string | null = ''
  role: string | null = ''

  ngOnInit(): void {
    this.status = localStorage.getItem("status");
    this.username = localStorage.getItem("username");
    if (this.status == "Approved") {
      this.router.navigate(["user"]);
    }
  }
}
