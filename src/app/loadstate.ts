import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Loadstate {
  public state = signal({
    isloading:false,
    error:false
  })

  setloading(loading:boolean) {
    this.state.update(current=> ({
      ...current,
      isloading:loading,
    }))
  }

  seterror() {
    this.state.update(current=>({
      ...current,
      isloading:false,
      error:true
    }))
  }

  get loading() {
    return this.state().isloading
  }
  get error() {
    return this.state().error
  }

}
