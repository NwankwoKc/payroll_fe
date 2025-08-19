import { Component } from '@angular/core';
import { Url } from '../url.service';
import { ChangeDetectorRef } from '@angular/core';
import { Flutterwave } from '../flutterwave';
@Component({
  selector: 'app-paysalary',
  templateUrl: './paysalary.html',
  styleUrls: ['./paysalary.css']
})
export class Paysalary {
  message: string = '';
  paymentResponses: any[] = []; // Array to store all webhook responses
  isProcessing: boolean = false;
  progress: number = 0;

  constructor(private url: Url, private cdr: ChangeDetectorRef,private flw:Flutterwave) {
  }
async processAllSalaries() {
  this.isProcessing = true;
  this.paymentResponses = [];
  this.progress = 0;
  
  // Subscribe to WebSocket FIRST
  const webSocketSubscription = this.flw.getMessages()?.subscribe({
    next: (res: any) => {
      this.paymentResponses.push(res);
      this.cdr.detectChanges();
      console.log('Payment response received:', res);
    },
    error: (err) => {
      console.error('WebSocket error in component:', err);
      this.message = 'WebSocket connection error';
    },
    complete: () => {
      console.log('WebSocket subscription completed');
    }
  });

  try {
    // Then initiate the bulk payment
    const initialResponse = await this.url.bulkpayment<{data: any}>('/bulkpayment')
      .toPromise();
    this.message = initialResponse?.data.message;
    console.log(this.message)
    // Optionally unsubscribe after some time or based on condition
    // setTimeout(() => webSocketSubscription.unsubscribe(), 30000);
    console.log(this.paymentResponses)
  } catch (error) {
    this.message = 'Error processing payments';
    this.isProcessing = false;
    webSocketSubscription?.unsubscribe();
  }
}
 
}