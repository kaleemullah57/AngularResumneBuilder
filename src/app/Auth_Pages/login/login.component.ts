import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Auth_Service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm: FormGroup;  // Reactive form for login
  errorMessage: string = ''; // For displaying error messages

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) {
    // Step 1: Initialize the form with email and password fields
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],       // Email field with validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with validation
    });
  }



  onLogin(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value ;

      this._authService.login(email, password).subscribe(
        (response: any) => {
          // Step 4: Store the token and navigate to another route
          console.log("Loged In SuccessFully");
          localStorage.setItem('jwtToken', response.token); // Save token in local storage
          this.errorMessage = '';                          // Clear error messages
          this.router.navigate(['/resumes']);            // Navigate to the dashboard

        },
        (error) => {
          this.errorMessage = 'Invalid email or password. Please try again.';
          console.log(error);
        }
      );
    }
  }
}
