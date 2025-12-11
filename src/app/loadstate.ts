import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Loadstate {
  public state = signal({
    isloading:false,
    error:false,
    success:false
  })

  public deletestate = signal(false)
  public imgloadstate = signal(false)

  setloading(loading:boolean) {
    this.state.update(current=> ({
      ...current,
      isloading:loading,
    }))
  }

  seterror(status:boolean) {
    this.state.update(current=>({
      ...current,
      isloading:false,
      error:status
    }))
  }
  
  setsucces(status:boolean) {
    this.state.update(current=>({
      ...current,
      success:status
    }))
  }
  
 setdelete(option:boolean) {
    this.deletestate.set(option)
 }

 setimgloadstate(status:boolean) {
    this.imgloadstate.set(status)
 }

  get loading() {
    return this.state().isloading
  }
  get error() {
    return this.state().error
  }
  get delete() {
    return this.deletestate
  }
  get success() {
    return this.state().success
  }
  get imgstate() {
    return this.imgloadstate
  }
}