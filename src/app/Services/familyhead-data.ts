import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyheadData {
  constructor(private http: HttpClient) { }

  private baseurl = environment.API_BASE_URL;
  
  GetAllHead(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}/Register/GetAllUser`)
  }
  RemoveHead(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseurl}/Register/DeleteUser/`+ id)
  }
}
