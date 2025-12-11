import { Component } from '@angular/core';
import { Url } from '../url.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loadstate } from '../loadstate';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-department',
  imports: [ErrorCard],
  templateUrl: './department.html',
  styleUrl: './department.css'
})
export class Department implements OnInit {
  uid!:string;
  data:any;
  errormessage!:ErrorMessage;
  emplength!:number;
  dptusers!:Array<any>
constructor(
    private url:Url,
    private router:Router,
    private activatedroute:ActivatedRoute,
    public loadstate:Loadstate
   ) {}
ngOnInit(): void {
  this.getdepartment();
}
  
  getdepartment() {
    this.loadstate.setloading(true)
    this.activatedroute.params.subscribe((params) =>{
      this.uid = params['id']
    })
    const id = localStorage.getItem('uid')
    if (id) this.url.getdepartmentspecific<any>('/departments',id,this.uid).subscribe({
      next:(res)=>{
        this.data = res.data
        if (this.data.employee) {
          this.emplength = this.data?.employees.length
          this.dptusers = this.data?.department_users
          this.loadstate.setloading(false)
          console.log(this.data,this.dptusers)
        } else {
          this.emplength = 0;
          this.loadstate.setloading(false)
        }      
      },
      error:(err)=>{
        this.loadstate.seterror(true)
        console.log(err)
      }
    })
  }

  navigate(id:string) {
    this.router.navigate([`/profile/${id}`])
  }
}
