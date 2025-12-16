import { Component, OnInit } from '@angular/core';
import { Status } from '../../Services/status';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-status-approved',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-status-approved.html',
  styleUrl: './admin-status-approved.css'
})
export class AdminStatusApproved implements OnInit{
  array:any[]=[]

  constructor(private service:Status, private route:Router){}

  sapproved:boolean=false;
  srejected:boolean=false;

 ngOnInit(): void {
   this.getAllUser()
 } 
 getAllUser()
 {
  this.service.GetAllUser().subscribe(data=>{
    console.log("users",data)
    this.array = data;
   })
 }

 Approved(id:number)
 {
  this.service.ApprovedRequest(id).subscribe(data=>{
    this.getAllUser();
    this.sapproved=true
  })
 }
 Rejected(id:number)
 {
  this.service.RejectRequest(id).subscribe(data=>{
    this.getAllUser();
    this.srejected=true;
  })
 }
 canDeactivate():boolean
 {
  const leave = confirm('Are you sure you want to leave this page?')

  if(leave)
  {
    if(!this.route.url.startsWith('/admin-dashboard'))
    {
      localStorage.clear();
    }
  }
  return leave;
 }
}
