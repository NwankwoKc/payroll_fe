import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Flutterwave {
  private socket$: WebSocketSubject<any> | undefined;
  private reconnect$ = new Subject<void>();
  private isConnected = false;

  constructor() {
    this.initializeWebSocket();
    
    // Handle reconnection attempts
    this.reconnect$.subscribe(() => {
      setTimeout(() => this.initializeWebSocket(), 3000);
    });
  }

  private initializeWebSocket(): void {
      // Use wss:// for secure connection (recommended for production)
  this.socket$ = webSocket({
  url: 'wss://payroll-be.onrender.com/ws',
  serializer: msg => JSON.stringify(msg),
  deserializer:(event: MessageEvent) => {
        try {
          // The data is on the .data property of the native MessageEvent
          return event.data;
        } catch (error) {
          // CRITICAL: If it's not JSON, don't crash. Log it and return a safe object.
          console.error('WebSocket parsing error:', error, 'Raw data:', event.data);
          // Return an error object that your UI can handle gracefully
          return {
            type: 'error',
            message: 'Failed to parse message',
            rawData: event.data
          };
        }
      },
  openObserver: {
    next: () => {
      console.log('Connection established');
    }
  },
  closeObserver: {
    next: () => {
      console.log('Connection closed');
    }
  }
  });

  
  this.socket$.subscribe({
    next:(value: any) => console.log(value),
    error:(err:any) => console.log(err)
  })
}
getmessage(){
  return this.socket$?.asObservable()
}
}
