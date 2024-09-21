import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  
  constructor(
    public fb: FormBuilder, 
    public router: Router,
    public http: HttpClient
  ) { 

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
  }
  get formControls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.http.post('http://localhost:3000/api/register', this.registerForm.value).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      );
    }
  }
  
}
