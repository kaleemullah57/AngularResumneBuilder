import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Auth_Service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';




import { MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
    selector: 'app-login',
    imports: [RouterOutlet, ReactiveFormsModule, RouterLink, CommonModule,
        MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButton,
      MatIconModule
    ],
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
      password: ['', [Validators.required, Validators.minLength(2)]], // Password field with validation
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
          this.router.navigate(['/final_resumes']);            // Navigate to the dashboard

        },
        (error) => {
          this.errorMessage = 'Invalid email or password. Please try again.';
          console.log(error);
        }
      );
    }
  }



  hidePassword : boolean = true;
// hidePassword(){
//     this.password = true;
//   }
}
