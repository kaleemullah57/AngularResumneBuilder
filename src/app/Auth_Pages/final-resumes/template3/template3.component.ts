import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FinalResume } from '../../../Models/final-resume';
import { AuthService } from '../../../Auth_Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template3',
  imports: [CommonModule],
  templateUrl: './template3.component.html',
  styleUrl: './template3.component.css'
})
export class Template3Component {
constructor(private _authService: AuthService) { }
  ngOnInit(): void {
    this.getAllResumes();
  }


 

  resumes: FinalResume[] = [];
  // Pagination 
  currentPage: number = 0;
  pageSize: number = 1;
  paginatedPage: FinalResume[] = [];




  getAllResumes(): void {
    this._authService.getAllResumes().subscribe(
      (data) => {
        this.resumes = data;
        console.log("dta fetched", data);
        this.updatePagination();
      },
      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized access - redirecting to login.');
          this._authService.logout();
          alert('Session expired. Please log in again.');
        } else {
          console.error('Error while fetching resumes:', error);
        }
      }
    );
  }



  updatePagination(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPage = this.resumes.slice(start, end);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize <= this.resumes.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagination();
    }
  }












  FontsColors: string[] = ['#FFFFFF', '#000000'];
  selectedFontsColor: string = '';
  applyFontsColor(color: string) {
    this.selectedFontsColor = color;
  }



  // Change Font Family
  FontFamily: string[] = ['Futura', 'Georgia', 'monospace']
  selectedFontFamily: string = '';
  applyFontFamily(fontFamily: string) {
    this.selectedFontFamily = fontFamily;
  }



  // Change Background Color
  backgroundColors: string[] = ['#ecf0f1', '#f5e6ca', '#e3f2fd', 'black'];
  selectedBackgroundColor: string = '';
  applyBackgroundColor(color: string) {
    this.selectedBackgroundColor = color;
    if (color === "black") {
      this.selectedFontsColor = "white";
    }else if (color == '#e3f2fd') {
      this.selectedFontsColor = "black";
    }
  }




  // currentIndex: number = 0;
  // totalResumes: number = 4;
  // scrollLeft() {
  //   if (this.currentIndex > 0) {
  //     this.currentIndex--;
  //   }
  // }
  // scrollRight() {
  //   if (this.currentIndex < this.totalResumes - 1) {
  //     this.currentIndex++;
  //   }
  // }







  // Download PDF
  // Method to download as PDF
  async downloadPDF(index: number) {
    const content = document.getElementById(`finalResume${index}`); // Use specific resume ID
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`finalResume${index + 1}.pdf`); // Dynamic file name
    } else {
      console.error('Resume content not found!');
    }
  }







  // Method to download as PNG
  async downloadPNG(index: number) {
    const content = document.getElementById(`finalResume${index}`); // Use specific resume ID
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');

      // Create a link element for downloading
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `finalResume${index + 1}.png`; // Dynamic file name
      link.click();
    } else {
      console.error('Resume content not found!');
    }
  }







  isDragging = false;
  activeItem: string | null = null;
  offset = { x: 0, y: 0 };

  // Define positions for each draggable item
  positions: { [key: string]: { x: number; y: number } } = {
    paragraph34: {x: 0, y: 0},
    paragraph35: {x: 0, y: 0},
    paragraph36: {x: 0, y: 0},
    paragraph37: {x: 0, y: 0}, 
    paragraph38: {x: 0, y: 0}, 
    paragraph39: {x: 0, y: 0}, 
    paragraph40: {x: 0, y: 0}, 
    paragraph41: {x: 0, y: 0}, 
    paragraph42: {x: 0, y: 0}, 
    paragraph43: {x: 0, y: 0}, 
    paragraph44: {x: 0, y: 0}, 
    paragraph45: {x: 0, y: 0}, 
    paragraph46: {x: 0, y: 0}, 
    paragraph47: {x: 0, y: 0}, 
    paragraph48: {x: 0, y: 0}, 
    paragraph49: {x: 0, y: 0}, 
    paragraph50: {x: 0, y: 0}, 
    paragraph51: {x: 0, y: 0}, 
    paragraph52: {x: 0, y: 0}, 
    paragraph53: {x: 0, y: 0}, 
  };

  // Triggered when the user clicks on a draggable item
  onMouseDown(event: MouseEvent, item: string): void {
    this.isDragging = true;
    this.activeItem = item;
  
    // Get the bounding rectangle of the clicked element
    const rect = (event.target as HTMLElement).getBoundingClientRect();
  
    // Calculate the offset relative to the clicked position
    this.offset.x = event.clientX;
    this.offset.y = event.clientY;
  }
  

  // Triggered when the user moves the mouse
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && this.activeItem) {
      const itemPosition = this.positions[this.activeItem];
      if (itemPosition) {
        itemPosition.x = event.clientX - this.offset.x;
        itemPosition.y = event.clientY - this.offset.y;
      }
    }
  }
  

  // Triggered when the user releases the mouse button
  onMouseUp(): void {
    this.isDragging = false;
    this.activeItem = null; // Reset the active item
  }


}
