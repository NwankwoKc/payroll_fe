import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payslip',
  imports: [CommonModule],
  templateUrl: './payslip.html',
  styleUrl: './payslip.css'
})
export class Payslip {
  payment: any;
  isLoaded = false;
  error: string | null = null;
  parameter:string | undefined;

  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getpayslip();
  }

  getpayslip() {
    this.route.params.subscribe(params=>{
      console.log(params['id'])
      this.parameter = params['id']
    })
    this.url.getusers<any>('/payment/'+this.parameter)
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
