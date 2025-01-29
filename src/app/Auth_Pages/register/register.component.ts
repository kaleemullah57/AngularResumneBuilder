import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Auth_Service/auth.service';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { User } from '../../Auth_Folders/Auth_Model/user';

@Component({
    selector: 'app-register',
    imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

  users : User= { username: '', email: '', password: '' };
  registrationSuccess : boolean = false;

  constructor(private _authService: AuthService, private route:Router) { }

  registerUser() {
    if (this.users.email && this.users.username && this.users.password) {
      this._authService.register(this.users).subscribe({
        next: (data) => {
          alert("User Registered successfully");
          this.registrationSuccess = true; // Uncommented and functional
          console.log("User Registered Successfully", data);
          this.route.navigate(['/login']); // Correctly references the instance
        },
        error: (err) => {
          console.log("Error Occurred during API Fetching", err);
          alert("Error Occurred during API Fetching");
        },
      });
    }
  }
}
