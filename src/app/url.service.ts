import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Url {
  private baseURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    const baseheader = new HttpHeaders()
  }

  // POST methods
  postuser<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }
  postattendance<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postdepartment<T>(url: string, data: any,id:string): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      headers:{
        id
      }
    });
  }

  postsalary<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postprofilepic<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`http://localhost:3000/api${url}`,data);
  }

  postposition<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  // GET methods
  getusers<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getdepartment<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      }
    });
  }
   getdepartmentspecific<T>(url: string,id:string,uid:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}/${uid}`,{
      headers:{
        id
      }
    });
  }

  getpostions<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      }
    });
  }

  getdepartmentemployees<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }
  getattendances<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getattendance<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getsalaryamount<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      }
    });
  }
  // Payment methods
  bulkpayment<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  // Login method
  login<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }
  signup<T>(url: string, data: any,id:string): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      headers:{
        id
      }
    });
  }


  //update user
   updateuser<T>(url: string, data: any,passcode:any): Observable<T> {
    return this.http.patch<T>(`${this.baseURL}${url}`, data,{
      headers:{
        "password":passcode
      }
    });
  }


  //delete methods
  deletedepartement<T>(url:string,id:string,uid:string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}${url}/${id}`,{
      headers:{
        id:uid
      }
    })
  }
}