import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  constructor(private http: HttpClient) { }

  private baseurl = environment.API_BASE_URL;

  VerifyUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/Auth/verifyuser/`, data)
  }
  ForgetPassword(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}/Auth/update/`+id,data)
  }
}
