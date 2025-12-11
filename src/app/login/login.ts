import { Component,ViewChild,signal} from '@angular/core';
import { Url } from '../url.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorMessage } from '../services/interface/error-message';
import { ErrorCard } from '../components/error-card/error-card';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,ErrorCard],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
LoginForm: any;
email: any;
password: any;
isLoading = signal(false)
error = signal(false);
errormessage!:ErrorMessage;
@ViewChild('loginForm') loginForm!: NgForm;
constructor(private urlservice:Url,private router:Router){}
   handleLogin() {
   if (this.loginForm.valid) {
       this.email = this.loginForm.value.email;
       this.password = this.loginForm.value.password;

     // Your login logic...
      this.isLoading.set(true)
      this.urlservice.login<any>('/auth/login', {
        email:this.email,
        password:this.password
      }).subscribe({
        next:(response)=>{
      // Handle successful login
      // Store token in localStorage or a state management service
      localStorage.setItem('uid', response.payload.uid);
      this.isLoading.set(false)
      if (response.payload.role === "Admin") {
        this.router.navigate(['/dashboard'])
      }
      if (response.payload.role === "Employee") {
        this.router.navigate(['/employeedashboard'])
      }
      },
      error:(err)=>{
        this.isLoading.set(false)
        this.error.set(true)
        console.log(err)
        this.errormessage = {
          message:err.error.message,
          status:err.status
        }
      }
      });
      
    }
  }
}
