import { Component } from '@angular/core';
import { Url } from '../url.service';
import { Loadstate } from '../loadstate';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';
import { LoadingGif } from '../components/loading-gif/loading-gif';


@Component({
  selector: 'app-attendance',
  imports: [ErrorCard,LoadingGif],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})

export class Attendance {
  
  error: string | undefined;
  msg:any
  errormessage!:ErrorMessage 
  location:any
constructor(private url:Url, public loadstate:Loadstate){}

  public async ClockIn(){
    
    this.loadstate.setloading(true)
    this.url.postattendance("/attendance",{
      employee_id:localStorage.getItem('uid')
    }).subscribe({
      next:(response)=>{
        this.loadstate.setloading(false)    
      },
      error:(err)=>{
        this.loadstate.seterror(true)
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
