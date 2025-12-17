import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberDashboardService  {
  constructor(private http:HttpClient) {}

  private baseurl = environment.API_BASE_URL;

  ShowAllMembers():Observable<any>
  {
    return this.http.get<any>(`${this.baseurl}/ShowAllMembers/ShowAllMembers`)
  }
  Search(searchText: string): Observable<any>
  {
  return this.http.get<any>(`${this.baseurl}/ShowAllMembers/search?search=${searchText}`);
  }
}
