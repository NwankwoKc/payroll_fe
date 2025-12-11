import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loadstate } from '../../loadstate';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dlt-message',
  imports: [CommonModule],
  templateUrl: './dlt-message.html',
  styleUrl: './dlt-message.css',
})
export class DltMessage {

constructor(private loadstate:Loadstate,private router:Router){}

  again() {
    this.loadstate.seterror(false)
    this.loadstate.setdelete(true);
  }
  dashboard() {
    this.loadstate.seterror(false)
    this.router.navigate(['/dashboard'])
  }
}
