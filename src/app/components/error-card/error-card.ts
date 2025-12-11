import { Component, Input, SimpleChanges } from '@angular/core';
import { OnChanges,input,SimpleChange } from '@angular/core';
import { ErrorMessage } from '../../services/interface/error-message';
import { Loadstate } from '../../loadstate';
import { Location } from '@angular/common';


@Component({
  selector: 'app-error-card',
  imports: [],
  templateUrl: './error-card.html',
  styleUrl: './error-card.css',
})
export class ErrorCard {
  constructor(public ls:Loadstate,private location:Location){}
  @Input() errormessage!: ErrorMessage;

  back() {
    this.ls.seterror(false);
    this.location.back();
  }
}
