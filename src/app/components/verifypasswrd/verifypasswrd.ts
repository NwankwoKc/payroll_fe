import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../supabase';
import * as bcrypt from "bcryptjs";
import { Url } from '../../url.service';
import { Loadstate } from '../../loadstate';
import { LoadingGif } from '../loading-gif/loading-gif';

@Component({
  selector: 'app-verifypasswrd',
  imports: [CommonModule,FormsModule,LoadingGif],
  templateUrl: './verifypasswrd.html',
  styleUrl: './verifypasswrd.css',
})
export class Verifypasswrd {
password:any;
databasepasswrd!:string

constructor(private sb:Supabase,private url:Url,public ls:Loadstate) {}
  async verify() {
  this.ls.setloading(true)
  let id = localStorage.getItem('uid');
    if (!id) return ; 
  const {data,error} = await this.sb.getuser(id)
  
    if (error) console.log('error',error)
    const compare = bcrypt.compareSync(this.password,data.password)
    this.ls.setloading(false);
    if (!compare) {
      this.ls.setdelete(false);
      return this.ls.seterror(true) 
    }
    this.ls.setdelete(false);
    this.ls.setsucces(true)
    console.log(this.ls.success)
  }
  cancel() {
    this.ls.setdelete(false)
  }
}