import { Injectable } from '@angular/core';
import {createClient} from '@supabase/supabase-js'
@Injectable({
  providedIn: 'root'
})
export class Supabase {
  supabasekey = 'https://jtdjpjsmhglhmybdaida.supabase.co'
  supabaseanonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZGpwanNtaGdsaG15YmRhaWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwNDkxMTcsImV4cCI6MjA2MTYyNTExN30.cEENj7eoQ2f7cIB3AjXOA7ONElxKYl4vYdEj6om2qpw'
  supabase: any;
  
  constructor() {
    this.supabase = createClient(this.supabasekey,this.supabaseanonkey)
  }

  getattendance() {
    const lstorage = localStorage.getItem('uid')
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    return this.supabase 
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
    .select("*")
    .eq('id',id)
  }
}
