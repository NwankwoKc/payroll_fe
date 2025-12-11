import { Component, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../../data.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Url } from '../../url.service';
import { Router } from '@angular/router';
import { Loadstate } from '../../loadstate';
import { ErrorMessage } from '../../services/interface/error-message';
import { ErrorCard } from '../../components/error-card/error-card';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,ErrorCard],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit implements OnInit,OnDestroy {
  message = '';
  data: any;
  errormessage!:ErrorMessage
  editedforms!:FormGroup
  private subscription: Subscription = new Subscription();
  constructor(private dataservice:DataService,private url:Url,private cdr:ChangeDetectorRef,private formbuilder:FormBuilder,private rt:Router,public loadstate:Loadstate){}

  ngOnInit(): void {
    this.subscription.add(
      this.dataservice.currentMessage.subscribe(msg => this.message = msg)
    );
    
    this.subscription.add(
      this.dataservice.currentData.subscribe(data => this.data = data)
    );
    console.log(this.data)
    this.edit()
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  } 
  onFileSelected(event:any){
    this.loadstate.setimgloadstate(true)
    console.log(this.loadstate.imgstate())
     const files: FileList = event.target.files;
     const locals = localStorage.getItem("uid")
    
    if (files && files.length > 0) {
      const formdata = new FormData();
      formdata.append('profileimage',files[0])
      this.url.postprofilepic("/user/uploadprofile/"+locals,formdata).subscribe(
        {
          next:(response:any) =>{
            console.log(response)
            this.data.profileimage = response.fileurl
            this.loadstate.setimgloadstate(false)
            this.cdr.detectChanges();
          },
          error: (err) => {
           console.log(err)
          }
        }
      )
    }   
  }
  edit(){
    this.editedforms = this.formbuilder.group({
      firstname:[this.data.firstname],
      lastname:[this.data.lastname],
      email:[this.data.email],
      phonenumber:[this.data.phonenumber],
      sex:[this.data.sex],
      department:[this.data.department],
      position:[this.data.position],
      bankname:[this.data.bankname],
      account_number:[this.data.account_number]
    })
  }

  savechanges(){
    this.loadstate.setloading(true)
    let ls = localStorage.getItem('uid')
    this.url.updateuser("/user/"+ls,this.editedforms.value,this.data.password).subscribe({
      next:(response:any)=>{
        this.loadstate.setloading(false)
        this.data = response.user
        this.rt.navigate(["/profile"])
      },
      error:(err:any)=>{
        this.loadstate.seterror(true)
        this.errormessage = {
          status:err.status,
          message:err.error.message
        }
      }
    })
  }
}