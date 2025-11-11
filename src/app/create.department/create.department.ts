import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { Loadstate } from '../loadstate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create.department',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.department.html',
  styleUrl: './create.department.css'
})
export class CreateDepartment implements OnInit {
createform!:FormGroup
errormessage:any;
constructor(
  private url:Url,
  public loadstate:Loadstate,
  private formbuilder:FormBuilder,
  private router:Router
){}


ngOnInit(): void {
  this.getval()
}

getval():void {
  this.createform  = this.formbuilder.group({
    name:[''],
    location:['']
  })
}

submit() {
  this.loadstate.setloading(true)
  const id = localStorage.getItem('uid')
  console.log(this.createform.value)
  if (id) this.url.postdepartment('/department',this.createform.value,id).subscribe({
    next:(el)=>{
      console.log(el,'department created') 
      this.loadstate.setloading(false);
      this.router.navigate(['/dashboard'])
      
    },
    error:(err)=>{
      this.errormessage = {
        status:err.status,
        message:err.error.message
      }
      this.loadstate.seterror();

    }
  })
}}