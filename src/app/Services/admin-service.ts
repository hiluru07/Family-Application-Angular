import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  private baseurl = environment.API_BASE_URL;

  showalluser(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/ShowAllMembers/ShowAllMembers`);
  }
  Login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/Auth/login`, data)
  }
  InsertMultipleMember(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/Member/add-members-admin`, data)
  }
  RemoveMember(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/Member/deletemember/${id}`);
  }
  AdminInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/Admin/adminInfo`)
  }
  UpdateAdmin(id: any, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/Admin/updateAdmin/`+id,data)
  }
}
