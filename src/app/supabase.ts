import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import { enviroment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  supabasekey:string
  supabaseanonkey:string 
  supabase: SupabaseClient;
  
  constructor() {
    this.supabasekey = enviroment.supabasekey as string
    this.supabaseanonkey = enviroment.supabaseanonkey as string
    this.supabase = createClient(this.supabasekey,this.supabaseanonkey,{
      auth:{
        autoRefreshToken:false,
        persistSession:false
      }
    })
  }

  getattendance() {
    const lstorage = localStorage.getItem('uid')
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    return this.supabase  //query for attendance for the month by using id
      .from('attendance')
      .select("*")
      .eq('employee_id',lstorage)
      .gte('createdAt', firstDay.toISOString())
      .lt('createdAt', firstDayNextMonth.toISOString())
      .order('createdAt', { ascending: true }) 
  } 
  getdepartment() {
    return this.supabase
    .from('department')
    .select('*')
  }
  getuser(id:string) {
    return this.supabase
    .from('user')
    .select('*')
    .eq('id',id)
    .single()
  }
  getpasswrd(id:string) {
    return this.supabase.auth.admin.getUserById(id)
  }
}
