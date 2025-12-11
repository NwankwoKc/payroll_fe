import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-msg',
  imports: [CommonModule],
  templateUrl: './success-msg.html',
  styleUrl: './success-msg.css',
})
export class SuccessMsg {
  title = "Deleted successfully"

  constructor(private route:Router){}

  dashboard() {
    this.route.navigate(['/dashboard'])
  }
}
