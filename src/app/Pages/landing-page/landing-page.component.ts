import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FinalResume } from '../../Models/final-resume';
import { FormsModule } from '@angular/forms';
import { User } from '../../Auth_Folders/Auth_Model/user';
import { AuthService } from '../../Auth_Service/auth.service';


@Component({
    selector: 'app-landing-page',
    imports: [RouterOutlet, CommonModule],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  // count users. 
  registeredUsers: number = 0


  // Left Right Moving
  currentIndex: number = 0;

  currentIndexForNumbers: number = 0;


  constructor(private _authService: AuthService) { }
  ngOnInit(): void {


    this.startCounting();
    this.getRegisteredUsers();
  }

  startCounting(): void {
    console.log('Counter started'); // Debugging log
    const interval = 25;
    const target = 100;
    const increment = 1;
  
    const timer = setInterval(() => {
      this.currentIndexForNumbers += increment;
      console.log(this.currentIndexForNumbers); // Debugging log
      if (this.currentIndexForNumbers >= target) {
        clearInterval(timer);
      }
    }, interval);
  }

  
  resumeFormats: string[] = ['format1', 'format2', 'format3'];
  scrollLeft(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  scrollRight(): void {
    if (this.currentIndex < this.resumeFormats.length - 1) {
      this.currentIndex++;
    }
  }


  // Total Registered Users 
  getRegisteredUsers(): void {
    this._authService.getAllRegisteredUsers().subscribe({
      next: (number) => {
        this.registeredUsers = number;
        // alert("Data is Fetched Successfully");
      },
      error(err) {
        // alert("Something is going wrong in the get all registerd Users");
        console.log("Error Occured during Getting All Users", err);
      },
    })
  }

  // scrollLeft(): void{
  //   const container = document.querySelector('.formats-of-resumes') as HTMLElement;
  //   container.scrollBy({left: -300, behavior: 'smooth'});
  // }

  // scrollRight():void{
  //   const container = document.querySelector(".formats-of-resumes") as HTMLElement;
  //   container.scrollBy({left : 300, behavior: 'smooth'});
  // }

}
