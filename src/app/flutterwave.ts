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
    try {
      // Use wss:// for secure connection (recommended for production)
      this.socket$ = webSocket('wss://payroll-be.onrender.com');
      
      this.socket$.subscribe({
        next: (msg) => {
          this.isConnected = true;
          console.log('WebSocket message received:', msg);
        },
        error: (err) => {
          console.error('WebSocket error:', err);
          this.isConnected = false;
          this.reconnect$.next();
        },
        complete: () => {
          console.log('WebSocket connection closed');
          this.isConnected = false;
          this.reconnect$.next();
        }
      });
    } catch (error) {
      console.error('WebSocket initialization failed:', error);
      this.reconnect$.next();
    }
  }

  getMessages(): Observable<any> | undefined{
    return this.socket$?.asObservable().pipe(
      catchError(error => {
        console.error('Error in WebSocket stream:', error);
        this.reconnect$.next();
        throw error;
      })
    );
  }

  isWebSocketConnected(): boolean {
    return this.isConnected;
  }
}