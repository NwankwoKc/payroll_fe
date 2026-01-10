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
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      withCredentials:true
    });
  }
  postattendance<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      withCredentials:true
    });
  }

  postdepartment<T>(url: string, data: any,id:string): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      headers:{
        id
      },
      withCredentials:true
    });
  }

  postsalary<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      withCredentials:true
    });
  }

  postprofilepic<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`http://localhost:3000/api${url}`,data,{
      withCredentials:true
    });
  }

  postposition<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      withCredentials:true
    });
  }

  // GET methods
  getusers<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      withCredentials:true
    });
  }

  getdepartment<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      },
      withCredentials:true
    });
  }
   getdepartmentspecific<T>(url: string,id:string,uid:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}/${uid}`,{
      headers:{
        id
      },
      withCredentials:true
    });
  }

  getpostions<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      },
      withCredentials:true
    });
  }

  getdepartmentemployees<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      withCredentials:true
    });
  }
  getattendances<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      withCredentials:true
    });
  }

  getattendance<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      withCredentials:true
    });
  }
   oath<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      withCredentials:true
    });
  }

  getsalaryamount<T>(url: string,id:string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`,{
      headers:{
        id
      },
      withCredentials:true
    });
  }
  // Payment methods
  bulkpayment<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  // Login method
  login<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data,{
      withCredentials:true
    });
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
      },
      withCredentials:true
    });
  }


  //delete methods
  deletedepartement<T>(url:string,id:string,uid:string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}${url}/${id}`,{
      headers:{
        id:uid
      },
      withCredentials:true
    })
  }
}