import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-payslips',
  imports: [CommonModule, RouterModule],
  templateUrl: './payslips.html',
  styleUrl: './payslips.css'
})
export class Payslips implements OnInit {
 userId: string | null = null;
  payment: any;
  isLoaded = false;
  error: string | null = null;
  parameter:string | undefined;
  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef
  ) {}
 ngOnInit() {
    // Get user ID from localStorage
    this.userId = localStorage.getItem('token');
    
    if (!this.userId) {
      console.error('No user ID found in localStorage');
      // Handle the case where user ID is not found
      return;
    }
    
    console.log('User ID:', this.userId);
    // Use the userId to fetch payslips or other data
    this.getpayslips()
  }
  getpayslips(){
 this.url.getusers<any>('/payments/'+this.userId)
      .subscribe({
        next: (response) => {
          this.payment = response.data;
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.log('profile data loaded:', this.payment);
        },
        error: (err) => {
          this.error = 'Failed to load profile data';
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
      });
  }
}
