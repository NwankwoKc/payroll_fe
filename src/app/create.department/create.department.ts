import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { Loadstate } from '../loadstate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-create.department',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ErrorCard],
  templateUrl: './create.department.html',
  styleUrl: './create.department.css'
})
export class CreateDepartment implements OnInit {
createform!:FormGroup
errormessage!:ErrorMessage;
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

  if (id) this.url.postdepartment('/departments',this.createform.value,id).subscribe({
    next:(el)=>{
      this.loadstate.setloading(false);
      this.router.navigate(['/dashboard'])
      
    },
    error:(err)=>{
      this.errormessage = {
        status:err.status,
        message:err.error.message
      }
      this.loadstate.seterror(true);

    }
  })
}}