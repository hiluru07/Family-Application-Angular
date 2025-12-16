import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Status {
  constructor(private http:HttpClient){}
  
  private baseurl = environment.API_BASE_URL;
  
  ApprovedRequest(id:number):Observable<any>
  {
    return this.http.put<any>(`${this.baseurl}/Admin/Approve/`+id,{})
  }
  RejectRequest(id:number):Observable<any>
  {
    return this.http.put<any>(`${this.baseurl}/Admin/Rejected/`+id ,{})
  }
  GetAllUser():Observable<any>
  {
    return this.http.get<any>(`${this.baseurl}/Admin/getalluser`)
  }
}
