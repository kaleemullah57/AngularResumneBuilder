import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Auth_Service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isMenuOpen: boolean = false;
  isLoggedIn : boolean = false;
  constructor(public _authservice:AuthService){}




  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Display Loged out button
  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('authToken'); // Check if the user is logged in
  }

  logOut(){
    this._authservice.logout();
    this.isLoggedIn = false;
    alert("User Loged Out Successfully");
  }




  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }


  isLoggedInn():boolean{
    return this.getToken() !== null;
  }




  


}
