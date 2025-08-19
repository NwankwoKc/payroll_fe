import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Url {
  private baseURL = 'https://payroll-be.onrender.com/api';

  constructor(private http: HttpClient) {}

  // POST methods
  postuser<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postdepartment<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postsalary<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postprofilepic<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  postposition<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  // GET methods
  getusers<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getdepartment<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getpostions<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getdepartmentemployees<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getattendance<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }

  getsalaryamount<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${url}`);
  }
  // Payment methods
  bulkpayment<T>(url: string, data?: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }

  // Login method
  login<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${url}`, data);
  }
}