import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FinalResume } from '../../Models/final-resume';
import { AuthService } from '../../Auth_Service/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PersonalRecordModel } from '../../Models/personal-record-model';


@Component({
    selector: 'app-final-resumes',
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './final-resumes.component.html',
    styleUrl: './final-resumes.component.css'
})
export class FinalResumesComponent {
  resumes: FinalResume[] = [];
  errorMessage: boolean = false;

  isSidebarOpen: boolean = false;

  constructor(private _authService: AuthService) { }
  ngOnInit(): void {
    this.getAllResumes();
  }


// Change Background Color
  backgroundColors: string[] = ['#ecf0f1', '#f5e6ca', '#e3f2fd', 'black'   ];
  selectedBackgroundColor: string = '';
  applyBackgroundColor(color: string) {
    this.selectedBackgroundColor = color;
    if(color === "black"){
      this.selectedFontsColor = "white";
    }else if(color == '#e3f2fd' ){
      this.selectedFontsColor = "black";
    }
  }



  // Change Font Color
  FontsColors: string[] = ['#FFFFFF', '#000000'];
  selectedFontsColor: string = '';
  applyFontsColor(color: string) {
    this.selectedFontsColor = color;
  }


  // Change Font Family
  FontFamily : string[] = ['Futura','Georgia', 'monospace']
  selectedFontFamily : string = '';
  applyFontFamily(fontFamily: string) {
    this.selectedFontFamily = fontFamily;
  }











  format = [
    { label: 'Education', value: 'Education' },
    { label: 'Professional', value: 'Professional' }
  ];
  selectedFormat: string = 'Professional';

  onChangeFormat() {
    this.selectedFormat;
  }



  currentIndex: number = 0;
  totalResumes: number = 3;
  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  scrollRight() {
    if (this.currentIndex < this.totalResumes - 1) {
      this.currentIndex++;
    }
  }



  // Toggle Sidebar 
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }



  getAllResumes(): void {
    this._authService.getAllResumes().subscribe(
      (data) => {
        this.resumes = data;
        console.log("dta fetched", data);
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


  deleteResumes(personalRecordid: number) {
    if (confirm("Are you sure you want to delete this resume")) {
      this._authService.deleteResume(personalRecordid).subscribe(() => {
        console.log("Record Deleted Successfully");
        this.getAllResumes();
      }, error => {
        console.log("Error Occured during Delete API Fetching", error);
        alert("Error Occured during Delete API Fetching");
      })
    }
  }


















  onLogout(): void {
    this._authService.logout();
    alert("User logout successfully");
  }






























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


}


