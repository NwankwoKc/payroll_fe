import { Component,ChangeDetectorRef } from '@angular/core';
import { Url } from '../url.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loadstate } from '../loadstate';
import { Supabase } from '../supabase';
import { enviroment } from '../../enviroments/enviroment';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';
import { UserProfile } from '../services/interface/interfaces';
@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule,ErrorCard],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css'
})
export class EmployeeDashboard implements OnInit{
  profile!:UserProfile<any>;
  attendance!:any[];
  error:Error | undefined
  missed:number | undefined
  present:number | undefined;
  late:number | undefined;
  errormessage!:ErrorMessage
    constructor(private url:Url,private cdr:ChangeDetectorRef,private router:Router,public loadstate:Loadstate,private sb:Supabase){}

    async ngOnInit(): Promise<void> {
     this.loadstate.setloading(true)
      this.url.getusers<any>('/user').subscribe({
        next:(response)=>{
          this.profile = response?.data
          let id_save = this.profile.id
          localStorage.setItem('uid',id_save)
          this.cdr.detectChanges()
        },
        error: (err:any) => {
          this.errormessage = {
            status:err.status,
            message:err.error.message
          }
          this.loadstate.seterror(true)
        }
      })

      //queries with supabase
  
      let dt = new Date()
      const {data,error} = await this.sb.getattendance()
      this.missed = dt.getDate() - data.length;
      this.present = data.length;
      this.late = 0;
      data.map((el:any)=>{
        if(el.status === 'late' && this.late) this.late++
      })

      this.attendance = data;
      this.loadstate.setloading(false)
    }

  profie(){
    this.router.navigate(["profile"])
  }
  clockin(){
    this.router.navigate(["attendance"])
  }
  reciept(){
    this.router.navigate(["payslips"])
  }
}
