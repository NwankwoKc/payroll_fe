import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Url } from '../url.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Loadstate } from '../loadstate';

@Component({
  selector: 'app-createuser',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './createuser.html',
  styleUrl: './createuser.css'
})
export class Createuser implements OnInit{
signupForm!: FormGroup;
department:any;
salary:any;
postion:any;
error:any
errormessage:any;
st = Loadstate;

    constructor(private formBuilder: FormBuilder, private url:Url,private cdr:ChangeDetectorRef,private router:Router,public statemanagement:Loadstate) {}

    ngOnInit(): void {
      this.initializeForm();
      this.getdetails();
    }
    async getdetails(){
      const id = localStorage.getItem('uid')
      if (!id) return 
        this.url.getdepartment<any>('/departments',id).subscribe({
          next:(response)=>{
            this.department = response.data
            this.cdr.detectChanges();  // Force change detection
          },
          error:(err) => {
          this.error = 'Failed to load profile data';
          this.cdr.detectChanges();  // Force change detection
          alert(this.error)
          console.error('Error:', err);
        }
        });
       
      this.url.getsalaryamount<any>('/salary',id).subscribe({
          next:(response)=>{
            this.salary = response.data
            this.cdr.detectChanges();  // Force change detection
          },
          error:(err) => {
          this.error = 'Failed to load profile data';
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
        });
       
        this.url.getpostions<any>('/positions',id).subscribe({
          next:(response)=>{
            this.postion = response.data
            this.cdr.detectChanges();  // Force change detection
          },
          error:(err) => {
          this.error = 'Failed to load profile data';
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
        });
      }


    initializeForm(): void {
      this.signupForm = this.formBuilder.group({
        // Personal Information
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        phonenumber: ['', [Validators.required]],
        sex: ['', [Validators.required]],

        // Employment Information
        department: ['', [Validators.required]],
        position: ['', [Validators.required]],
        jobtitle: ['', [Validators.required]],
        hiredate: ['', [Validators.required]],
        salary: ['', [Validators.required, Validators.min(0)]],
        experience: [''],

        // Financial Information
        bankname: ['', [Validators.required]],
        bank_code: ['', [Validators.required]],
        account_number:['',[Validators.required]],
      });
    }

    isFieldInvalid(fieldName: string): boolean {
      const field = this.signupForm.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }

    async onSubmit(): Promise<void> {
      const id = localStorage.getItem('id')
      if (!id) return 
      if (this.signupForm.valid)  {
        this.statemanagement.setloading(true);
        console.log('Form submitted with values:', this.signupForm.value);
         try {
            this.url.signup<any>('/user', this.signupForm.value,id).subscribe({
              next:(response)=>{
              // Store token in localStorage or a state management service
              this.statemanagement.setloading(false)
              },
              error:(err)=>{
                this.error = 'Failed to load profile data';
                console.error('Error:', err);
              }
            });
          } catch (error) {
            // Handle signup error
            this.statemanagement.seterror()
            console.error('Signup failed:', error);
          }
      } else {
        alert('Form is invalid');
        this.markFormGroupTouched(this.signupForm);
      }
    }

    private markFormGroupTouched(formGroup: FormGroup): void {
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        control?.markAsTouched();

        if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        } else if (control instanceof FormArray) {
          control.controls.forEach(arrayControl => {
            if (arrayControl instanceof FormGroup) {
              this.markFormGroupTouched(arrayControl);
            }
          });
        }
      });
    }

}
