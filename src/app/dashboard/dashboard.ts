import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private router: Router) {}

  department() {
    this.router.navigate(['/departments']);
  }
  createEmployee(){
    this.router.navigate(['/signup'])
  }
  manageEmployees(){
    this.router.navigate(['/employees'])
  }
  runPayroll(){
    this.router.navigate(['/paysalary'])
  }
  payslips(){
    this.router.navigate(['/payslips'])
  }
  clockin(){
    this.router.navigate(['/attendance'])
  }
  attendance(){
    this.router.navigate(['/'])
  }
  createdepartment() {
    this.router.navigate(['/departments/create'])
  }
}
