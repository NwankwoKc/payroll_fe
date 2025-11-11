import { Component } from '@angular/core';
import { Url } from '../url.service';
import { Loadstate } from '../loadstate';

interface errmsg {
  status:string,
  message:string
}

@Component({
  selector: 'app-attendance',
  imports: [],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})

export class Attendance {
  
  error: string | undefined;
  msg:any
  errormessage:errmsg | undefined
  location:any
constructor(private url:Url, public loadstate:Loadstate){}

  public async ClockIn(){
    
    this.loadstate.setloading(true)
    this.url.postattendance("/attendance",{
      employee_id:localStorage.getItem('uid')
    }).subscribe({
      next:(response)=>{
        this.loadstate.setloading(false)
        console.log(response)
        
      },
      error:(err)=>{
        this.loadstate.seterror()
        this.msg = "already clocked in for today"
        this.error = 'Failed to load profile data';
        this.errormessage = {
          status:err.status,
          message:err.error.message
        } 
      }
    })
  }
}
