import { Component, OnInit, ChangeDetectorRef, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Supabase } from '../supabase';
import { FormsModule } from '@angular/forms';
import bcrypt from 'bcryptjs';
import { Verifypasswrd } from '../components/verifypasswrd/verifypasswrd';
import { Loadstate } from '../loadstate';
import { SuccessMsg } from '../components/success-msg/success-msg';
import { DltMessage } from '../components/dlt-message/dlt-message';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule,FormsModule,Verifypasswrd,SuccessMsg,DltMessage,ErrorCard],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})

export class Departments implements OnInit {
  department: any[] | undefined;
  isLoading = signal(false);
  error = signal(false);

  password!:string
  uid!:string

  errormessage!:ErrorMessage;
  id = localStorage.getItem('uid')
  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef,
    private http:HttpClient,
    private router:Router,
    private sb:Supabase,
    public state:Loadstate
  ) {}

  ngOnInit(): void {
    this.getdepartment();
  }
  departmentapi():Observable<any> | void{
    let id = localStorage?.getItem('uid')
    if (!id) {
      return this.error.set(true)
    }
    return this.http.get<any>('http://localhost:3000/api/departments',{
      withCredentials:true
    })
  }
  
   getdepartment() {
    this.isLoading.set(true)
     return this.departmentapi()?.subscribe({
      next:(res)=>{
        this.department = res.data;
        this.isLoading.set(false)
      },
      error:(err)=>{
        console.log(err)
        this.isLoading.set(false)
        this.error.set(true)
        this.errormessage = {
          status:err.status,
          message:err.error.message
        }
      }
     })
  }
  details(id:string) {
    this.router.navigate([`/department/${id}`])
  }
  delete(id:string) {
    this.uid = id;
    this.state.setdelete(true)
  }
  cancel() {
    this.state.setdelete(false)
  }
  async dt():Promise<void>{
    const id = localStorage?.getItem('uid')
    if(!id) return  
    const {data,error} = await this.sb.getuser(id)
 
    if (error) {
      this.error.set(true)
      this.errormessage = {
      status:error.status,
      message:error.error.message
      }
    }
    let passwrd = data.password

    const check = bcrypt.compareSync(this.password,passwrd);
    if (!check) {
      this.error.set(true)
        this.errormessage = {
          status:401,
          message:"incorrect password"
        }
    }
    this.url.deletedepartement('/departments',this.uid,id).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}