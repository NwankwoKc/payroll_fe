
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Loadstate } from '../loadstate';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,ErrorCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  profile: any;
  parameter:string | undefined |null;
  fileName = ''
  errormessage!:ErrorMessage;
  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef,
    private route:ActivatedRoute,
    private router:Router,
    private dataservice:DataService,
    public loadstate:Loadstate
  ) {}

  ngOnInit(): void {
    this.loadstate.setloading(true)
    this.getprofile();
  }

  getprofile() {
    this.route.params.subscribe(params=>{
      this.parameter = params['id']
    })
    if(this.parameter == null) this.parameter = localStorage.getItem("uid")
    this.url.getusers<any>('/user/'+this.parameter)
      .subscribe({
        next: (response) => {
          this.loadstate.setloading(false)
          this.profile = response.data;
          this.cdr.detectChanges();  // Force change detection
        },
        error: (err) => {
          this.cdr.detectChanges();  // Force change detection
          this.loadstate.seterror(true)
          this.errormessage = {
            status:err.status,
            message:err.error.message
          }
        }
      });
  }
  uploadprofilepicture() {
     this.route.params.subscribe(params=>{
      this.parameter = params['id']
    })
    this.url.postprofilepic("/user/uploadprofile/"+this.parameter,{})
  }

  edit(){
    this.dataservice.changeMessage("New message from Component1");
    this.dataservice.updateData(this.profile);
    this.router.navigate(['profile-edit'])
  }
}