import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Url } from '../url.service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Supabase } from '../supabase';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Loadstate } from '../loadstate';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-employees',
  imports: [CommonModule,RouterModule,FormsModule,ErrorCard],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit{
form!:FormGroup
employees:any
emp:any
errormessage!:ErrorMessage;
lent = 0;
male:number | undefined;
female:number | undefined;
department:number | undefined
departments:any;

depart = '';
gender = '';
name:any;

constructor(private url:Url,
  private cdr:ChangeDetectorRef,
  private router:Router,
  private sb:Supabase,
  public loadstate:Loadstate
){}
ngOnInit(): void {
  this.getemployee();
}
userdetails(){
  this.router.navigate(['userdetails/'])
}

 private async getemployee() {
    try {
      // Set initial loading state
      this.loadstate.setloading(true);
      this.cdr.markForCheck(); // Mark component for check

      // Fetch data
      const id = localStorage.getItem('uid')
      if(!id) return
      const response = await this.url.getdepartment<{data: any[]}>('/user',id)
        .toPromise();
      // Update state
      this.employees = response?.data || [];
      this.emp = response?.data || [];
      this.lent = this.employees.length
      let male = this.employees.filter((el:any)=>{
        return true ? el.sex === 'Male':false
      })
      this.male = male.length;
      if (this.male) this.female = this.lent - this.male;
      // Force change detection
      const {data,error} = await this.sb.getdepartment();
      this.department = data.length;
      this.departments = data;
      this.loadstate.setloading(false)
      if (error) {
        console.log("dp error has occured", error)
      }

    } catch (error) {
      this.loadstate.seterror(true)
      console.error(error);
    }
  }
  search() {
  let splitstring: Array<string> = this.name?.split(" ");
  const result = this.emp?.filter((el:any)=>{
    if (this.name && this.gender && this.depart === '') {
      if (splitstring.length > 1 && this.gender) {
      return true ? el.firstname === splitstring[0] || el.lastname[0] || el.firstname === splitstring[1] || el.lastname === splitstring[1] && el.sex === this.gender:false
      } else {
        return true ? el.firstname === this.name || el.lastname === this.name && el.sex === this.gender:false
      }
    }
    //filtering department 
     if (this.name && this.gender && this.depart) {
      if (splitstring.length > 1 && this.gender) {
      return true ? el.firstname === splitstring[0] || el.lastname[0] || el.firstname === splitstring[1] || el.lastname === splitstring[1] && el.sex === this.gender && el.department === this.depart:false
      } else {
        return true ? el.firstname === this.name || el.lastname === this.name && el.sex === this.gender && el.department === this.depart:false
      }
    }

    if (this.name && this.gender == '' && this.depart == '') {
      if (splitstring.length > 1 && this.gender) {
      return true ? el.firstname === splitstring[0] || el.lastname[0] || el.firstname === splitstring[1] || el.lastname === splitstring[1]:false
      } else {
        return true ? el.firstname === this.name || el.lastname === this.name:false
      }
    }
    //filtering department
    if (this.name && this.gender == '' && this.depart) {
      if (splitstring.length > 1 && this.gender) {
      return true ? el.firstname === splitstring[0] || el.lastname[0] || el.firstname === splitstring[1] || el.lastname === splitstring[1] && el.department === this.depart:false
      } else {
        return true ? el.firstname === this.name || el.lastname === this.name && el.department === this.depart:false
      }
    }


    if (this.name == undefined && this.gender && this.depart == '') {
      return true ? el.sex === this.gender:false
    }
    //filtering department
     if (this.name == undefined && this.gender && this.depart) {
      return true ? el.sex === this.gender && el.department === this.depart:false
    }

    if (this.depart && this.name == undefined && this.gender == '') {
      return true ? el.department === this.depart:false
    }
    return true
  })

  this.employees = result
  this.cdr.detectChanges()
  }
}