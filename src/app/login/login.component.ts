import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    public fb: FormBuilder, 
    public http: HttpClient, 
    public router: Router

  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    
  }
  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.http.post('http://localhost:3000/api/login', this.loginForm.value).subscribe(
        (response: any) => {
          console.log("response==>",response);
          
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          this.isLoading = false;
        }
      );
    }
  }
  
}
