import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();




  @ViewChild('animatedContainer', { static: false }) animatedContainer!: ElementRef;

  animationPlayed = false;


  ngAfterViewInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    if (this.animationPlayed || !this.animatedContainer) return;

    const elementTop = this.animatedContainer.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight) {
      this.animatedContainer.nativeElement.classList.add('animate');
      this.animationPlayed = true;
    }
  }







  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedInn():boolean{
    return this.getToken() !== null;
  }

}
