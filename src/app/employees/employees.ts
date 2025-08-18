import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Url } from '../url.service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-employees',
  imports: [CommonModule,RouterModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit{
employees:any
isLoaded = false
error:any;
lent = 0;

constructor(private url:Url,
  private cdr:ChangeDetectorRef,
  private router:Router
){}
ngOnInit(): void {
  this.getemployee();
}
userdetails(){
  this.router.navigate(['userdetails/'])
}

 private async getemployee() {
    try {
      // Set initial loading state
      this.isLoaded = false;
      this.error = null;
      this.cdr.markForCheck(); // Mark component for check

      // Fetch data
      const response = await this.url.getdepartment<{data: any[]}>('/user')
        .toPromise();
      
      // Update state
      this.employees = response?.data || [];
      this.isLoaded = true;
      this.lent = this.employees.length
      
      // Force change detection
      this.cdr.detectChanges();
      console.log(this.employees)
    } catch (error) {
      this.error = 'Failed to load departments';
      this.isLoaded = true;
      this.cdr.detectChanges();
      console.error('Error loading departments:', error);
    }
}
}
