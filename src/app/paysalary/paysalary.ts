import { Component,OnInit} from '@angular/core';
import { Url } from '../url.service';
import { ChangeDetectorRef } from '@angular/core';
import { Flutterwave } from '../flutterwave';
import { takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorMessage } from '../services/interface/error-message';

@Component({
  selector: 'app-paysalary',
  templateUrl: './paysalary.html',
  styleUrls: ['./paysalary.css'],
  imports: [CommonModule]
})
export class Paysalary {
  message: string = '';
  paymentResponses: any[] = []; // Array to store all webhook responses
  isProcessing: boolean = false;
  progress: number = 0;

  constructor(private url: Url, private cdr: ChangeDetectorRef,private flw:Flutterwave) {
 
  }
  ngOnInit(): void {
    this.subscribeToMessages();
  }

  private subscribeToMessages(): void {
    // Subscribe to all messages
    this.flw.getmessage()?.subscribe({
        next: (message: any) => {
          this.paymentResponses.push(JSON.parse(message));
          console.log('New message received:', message);
          console.log(this.paymentResponses)
          this.cdr.markForCheck()
        },
        error: (error: any) => {
          console.error('Error receiving messages:', error);
        }
      });
  }

  async processAllSalaries() {
  this.isProcessing = true;
  this.paymentResponses = [];
  this.progress = 0;
  try {
    // Then initiate the bulk payment
    const initialResponse = await this.url.bulkpayment<{data: any}>('/bulkpayment',{}).toPromise();
    this.message = initialResponse?.data.message;
    console.log(this.message)
    // Optionally unsubscribe after some time or based on condition
    // setTimeout(() => webSocketSubscription.unsubscribe(), 30000);
    console.log(this.paymentResponses)
  } catch (error) {
    this.message = 'Error processing payments';
    this.isProcessing = false;
  }
}
 
}