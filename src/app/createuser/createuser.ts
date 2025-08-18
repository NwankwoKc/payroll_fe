import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Url } from '../url.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    constructor(private formBuilder: FormBuilder, private url:Url,private cdr:ChangeDetectorRef,private router:Router) {}

    ngOnInit(): void {
      this.initializeForm();
      this.getdetails();
    }
    async getdetails(){
        this.url.getdepartment<any>('/departments').subscribe({
          next:(response)=>{
            this.department = response.data
            this.cdr.detectChanges();  // Force change detection
          },
          error:(err) => {
          this.error = 'Failed to load profile data';
          this.cdr.detectChanges();  // Force change detection
          console.error('Error:', err);
        }
        });
       
      this.url.getsalaryamount<any>('/salary').subscribe({
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
       
        this.url.getpostions<any>('/positions').subscribe({
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
        profileimage: [''],

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

        // Emergency Contacts
        emergencyContacts: this.formBuilder.array([
          this.createContactFormGroup()
        ])
      });
    }

    createContactFormGroup(): FormGroup {
      return this.formBuilder.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]]
      });
    }

    get emergencyContacts(): FormArray {
      return this.signupForm.get('emergencyContacts') as FormArray;
    }

    addContact(): void {
      this.emergencyContacts.push(this.createContactFormGroup());
    }

    removeContact(index: number): void {
      if (this.emergencyContacts.length > 1) {
        this.emergencyContacts.removeAt(index);
      }
    }

    onFileChange(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.signupForm.patchValue({
          profileimage: file
        });
      }
    }

    isFieldInvalid(fieldName: string): boolean {
      const field = this.signupForm.get(fieldName);
      return !!(field && field.invalid && (field.dirty || field.touched));
    }

    resetForm(): void {
      this.signupForm.reset();
      // Reset emergency contacts to have at least one
      this.signupForm.setControl('emergencyContacts', this.formBuilder.array([
        this.createContactFormGroup()
      ]));
    }

    async onSubmit(): Promise<void> {
      if (this.signupForm.valid)  {
        console.log('Form submitted with values:', this.signupForm.value);
      
         try {
            this.url.login<any>('/user', this.signupForm.value).subscribe({
              next:(response)=>{
            // Handle successful singup
            console.log('Signup successful:', response);
            // Store token in localStorage or a state management service
            localStorage.setItem('uid', response.id);
            if(response.status === 200){
              this.router.navigate(['/dashboard'])
            }
              },
              error:(err)=>{
                this.error = 'Failed to load profile data';
                console.error('Error:', err);
              }
            });
            
          } catch (error) {
            // Handle signup error
            console.error('Signup failed:', error);
          }
      
        alert('Form submitted successfully! Check console for form values.');
      } else {
        console.log('Form is invalid');
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
