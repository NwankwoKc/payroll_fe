
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Url } from '../url.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  profile: any;
  isLoaded = false;
  error: string | null = null;
  parameter:string | undefined;

  constructor(
    private url: Url,
    private cdr: ChangeDetectorRef,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getprofile();
  }

  getprofile() {
    this.route.params.subscribe(params=>{
      console.log(params['id'])
      this.parameter = params['id']
    })
    this.url.getusers<any>('/user/'+this.parameter)
      .subscribe({
        next: (response) => {
          this.profile = response.data;
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.log('profile data loaded:', this.profile);
        },
        error: (err) => {
          this.error = 'Failed to load profile data';
          this.isLoaded = true;
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
      });
  }
}
