import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Register {
  
  constructor(private http:HttpClient){}

  private baseurl = environment.API_BASE_URL;

  Register(data:FormData):Observable<any>
  {
    return this.http.post<any>(`${this.baseurl}/Register/Register`,data)
  }
}
