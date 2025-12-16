import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Login {
  constructor(private http: HttpClient) { }

  private baseurl = environment.API_BASE_URL;

  Login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseurl}/Auth/login`, data)
  }
}
