import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FinalResume } from '../../Models/final-resume';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  currentIndex :number = 0;
  resumeFormats : string[] = ['format1', 'format2'];
  scrollLeft():void{
    if(this.currentIndex > 0){
      this.currentIndex--;
    }
  }

  scrollRight():void{
    if(this.currentIndex< this.resumeFormats.length -1){
      this.currentIndex++;
    }
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
