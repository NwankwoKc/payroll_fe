// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it a singleton service
})
export class DataService {
  private messageSource = new BehaviorSubject<string>('Default message');
  currentMessage = this.messageSource.asObservable();

  private dataStore = new BehaviorSubject<any>({});
  currentData = this.dataStore.asObservable();

  private payslipdatastore = new BehaviorSubject<any>("")
  currentpayslipstore = this.payslipdatastore.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  updateData(data: any) {
    this.dataStore.next(data);
  }
}