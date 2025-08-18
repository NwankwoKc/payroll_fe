import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments implements OnInit {
  department: any[] = [];
  isLoaded = false;
  error: string | null = null;

  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef  // Add ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getdepartment();
  }

  getdepartment() {
    this.url.getdepartment<any>('/departments')
      .subscribe({
        next: (response) => {
          this.department = response.data;
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.log('Departments loaded:', this.department);
        },
        error: (err) => {
          this.error = 'Failed to load departments';
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
      });
  }
}