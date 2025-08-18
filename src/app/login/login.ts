import { Component,ViewChild } from '@angular/core';
import { Url } from '../url.service';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
LoginForm: any;
email: any;
password: any;
error:any;
@ViewChild('loginForm') loginForm!: NgForm;
constructor(private urlservice:Url){}
   handleLogin() {
   if (this.loginForm.valid) {
       this.email = this.loginForm.value.email;
       this.password = this.loginForm.value.password;
      
      
     // Your login logic...

      this.urlservice.login<any>('/auth/login', {
        email:this.email,
        password:this.password
      }).subscribe({
        next:(response)=>{
      // Handle successful login
      console.log('Login successful:', response);
      // Store token in localStorage or a state management service
      localStorage.setItem('token', response.payload.uid);
      },
      error:(err)=>{
        this.error = 'Failed to load profile data';
        console.error('Error:', err);
      }
      });
      
    }
  }
}
