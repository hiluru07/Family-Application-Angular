import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Userview {
  constructor(private http:HttpClient){}

  private baseurl = environment.API_BASE_URL;

  GetMember():Observable<any>
  {
    return this.http.get<any>(`${this.baseurl}/Member/getmember`)
  }
  InsertMember(data:FormData):Observable<any>
  {
    return this.http.post<any>(`${this.baseurl}/Member/add-member`,data)
  }
  RemoveMember(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.baseurl}/Member/deletemember/`+id)
  }
  ModifyMember(id:any,data:any):Observable<any>
  {
    return this.http.put<any>(`${this.baseurl}/Member/updateMember/`+id,data)
  }
  UpdateUser(id:any,data:FormData):Observable<any>
  {
    return this.http.put<any>(`${this.baseurl}/Register/modifyUser/`+id,data)
  }
}
