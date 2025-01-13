import { Component, OnInit } from '@angular/core';
import { FinalResume } from '../../Models/final-resume';
import { AuthService } from '../../Auth_Service/auth.service';
import { CommonModule, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ExperienceRecordModel } from '../../Models/experience-record-model';
import { EducationRecordModel } from '../../Models/education-record-model';
import { ExtraEducationModel } from '../../Models/extra-education-model';
import { error } from 'console';
import { SkillsRecordModel } from '../../Models/skills-record-model';
import { LanguageRecordModel } from '../../Models/language-record-model';





// download Resume Imports
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-resumes',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterLink],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.css'
})
export class ResumesComponent implements OnInit {

  resumes: FinalResume[] = [];
  errorMessage: boolean = false;

  isSidebarOpen: boolean = false;



  // Update Education Record
  selectedEducationId: number | null = null;
  updatedEducation: EducationRecordModel = {
    educationId: 0,
    degree: '',
    institute: '',
    yearOfCompletion: '',
    personalRecordId: 0,
    id: 0,
  };



  // Update Extra Education Record
  selectedExtraEducationRecordId: number | null = null;
  updateExEducationModel: ExtraEducationModel = {
    exEducationId: 0,
    exEduDegree: '',
    exEduInstitute: '',
    exEduYearOfCompletion: '',
    personalRecordId: 0,
    id: 0
  }



  // Update Experience Record 
  SelectedExperienceRecordId: number | null = null;
  updateExperience: ExperienceRecordModel = {
    experienceId: 0,
    jobTitle: '',
    location: '',
    yearsOfExperience: '',
    personalRecordId: 0,
    id: 0
  }




  // Update Skills Record
  SelectedSkillsRecordId: number | null = null;
  updateSkillRecord: SkillsRecordModel = {
    skillId: 0,
    skillName: '',
    efficiency: '',
    personalRecordId: 0,
    id: 0
  }





  selectedLanguageRecordId: number | null = null;
  updateLanguageModel: LanguageRecordModel = {
    languageId: 0,
    languageName: '',
    personalRecordId: 0,
    id: 0
  }
  constructor(private _authService: AuthService) { }
  ngOnInit(): void {
    this.getAllResumes();
  }



  // Show the edit form
  editEducation(education: EducationRecordModel) {
    this.selectedEducationId = education.educationId;
    this.updatedEducation = { ...education }; // Copy the selected education details
  }

  // Submit the update
  submitUpdate() {
    const { educationId, personalRecordId } = this.updatedEducation;
    this._authService.updateEducationRecord(educationId, personalRecordId, this.updatedEducation).subscribe(
      (response) => {
        console.log('Update successful:', response);
        this.selectedEducationId = null; // Hide the form
        this.getAllResumes(); // Refresh the data
        console.log("record updated successfully", this.updatedEducation.yearOfCompletion, this.updatedEducation.degree);
      },
      (error) => {
        console.error('Error updating education record:', error);
      }
    );
  }

  // Cancel editing
  cancelEdit() {
    this.selectedEducationId = null;
    this.updatedEducation = {
      educationId: 0,
      degree: '',
      institute: '',
      yearOfCompletion: '',
      personalRecordId: 0,
      id: 0,
    };
  }




  // Edit Extra Education Record
  editExtraEducation(extra: ExtraEducationModel) {
    this.selectedExtraEducationRecordId = extra.exEducationId;
    this.updateExEducationModel = { ...extra };
  }

  submitExtraEducationRecord() {
    const { exEducationId, personalRecordId } = this.updateExEducationModel;
    this._authService.updateExtraEducation(exEducationId, personalRecordId, this.updateExEducationModel).subscribe(
      (data) => {
        console.log("Your Data is Updated Successfully", data);
        this.selectedExtraEducationRecordId = null;
        this.getAllResumes();
      }, (error) => {
        console.log("Error Occured during Extra Education Update API Fetching", error);
      }
    )
  }

  cancelExtraEducationEdit() {
    this.selectedExtraEducationRecordId = null;
    this.updateExEducationModel = {
      exEducationId: 0,
      exEduDegree: '',
      exEduInstitute: '',
      exEduYearOfCompletion: '',
      personalRecordId: 0,
      id: 0
    }
  }



  // Edit Experience Record
  editExperienceRecord(exp: ExperienceRecordModel) {
    this.SelectedExperienceRecordId = exp.experienceId;
    this.updateExperience = { ...exp };
  }

  submitExperienceRecord() {
    const { experienceId, personalRecordId } = this.updateExperience;
    this._authService.updateExperienceRecord(experienceId, personalRecordId, this.updateExperience).subscribe(
      (response) => {
        console.log('Update successful:', response);
        this.SelectedExperienceRecordId = null; // Hide the form
        this.getAllResumes(); // Refresh the data
        console.log("record updated successfully", this.updateExperience.jobTitle, this.updateExperience.location);
      },
      (error) => {
        console.error('Error updating education record:', error);
      }
    );
  }
  cancelExperienceEdit() {
    this.SelectedExperienceRecordId = null;
    this.updateExperience = {
      experienceId: 0,
      jobTitle: '',
      location: '',
      yearsOfExperience: '',
      personalRecordId: 0,
      id: 0
    }
  }






  // Edit Skills Records 
  editSkillsRecords(skill: SkillsRecordModel) {
    this.SelectedSkillsRecordId = skill.skillId;
    this.updateSkillRecord = { ...skill };
  };

  submitSkillsRecord() {
    const { skillId, personalRecordId } = this.updateSkillRecord;
    this._authService.updateSkillsRecord(skillId, personalRecordId, this.updateSkillRecord).subscribe(
      (data) => {
        console.log("Your Data is Updated Successfully", data);
        this.SelectedSkillsRecordId = null;
        this.getAllResumes();
      }, (error) => {
        console.log("Error Occured during Skills Update API Fetching", error);
      }
    )
  }

  cancelSkillsEdit() {
    this.SelectedSkillsRecordId = null;
    this.updateSkillRecord = {
      skillId: 0,
      skillName: '',
      efficiency: '',
      personalRecordId: 0,
      id: 0
    }
  }






  // Update Language Record

  editLanguageRecord(language: LanguageRecordModel) {
    this.selectedLanguageRecordId = language.languageId;
    this.updateLanguageModel = { ...language };
  }

  submitLanguageRecord() {
    const { languageId, personalRecordId } = this.updateLanguageModel;
    this._authService.updateLanguageRecord(languageId, personalRecordId, this.updateLanguageModel).subscribe(
      (data) => {
        console.log("Your Record is Updated Successfully", data);
        this.selectedLanguageRecordId = null;
        this.getAllResumes();
      }, (error) => {
        console.log("Error Occured during update languge API Fetching", error);
      }
    )
  }

  cancelLanguageEdit() {
    this.selectedLanguageRecordId = null;
    this.updateLanguageModel = {
      languageId: 0,
      languageName: '',
      personalRecordId: 0,
      id: 0
    }
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
        console.log("data fetched", data);
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










  // Delete Education Record Only
  deleteEducationRecord(edu: any) {
    if (confirm("Are you sure you want to delete this education record")) {
      const personalRecordId = edu.personalRecordId;
      const educationId = edu.educationId;

      this._authService.deleteEducationRecordOnly(personalRecordId, educationId).subscribe(
        (data) => {
          console.log("Your data is deleted successfully", data);
          this.getAllResumes();
        }, (error) => {
          console.log("Error Occured during Delete only Education Record API", error);
        }
      )
    }
  }

  // Delete Extra Education Record By Id
  deleteExtraEducationRecordById(extraEducation: any) {
    if (confirm("Are you Sure you want to delete this record")) {
      const personalRecordId = extraEducation.personalRecordId;
      const exEducationId = extraEducation.exEducationId;
      this._authService.deleteExtraEducationRecordById(personalRecordId, exEducationId).subscribe(
        (data) => {
          console.log("Extra Education Record is deleted Successfully", data);
          this.getAllResumes();
        },
        () => {
          alert("Something is going wrong with Extra Education Record while Record Deleting");
          console.log("Something is going wrong with Extra Education Record while Record Deleting")
        }
      )
    }
  }



  // Delete Experience Record By Id
  deleteExperienceRecordById(exp: any) {
    if (confirm("Are you sure you want to delete this record")) {
      const personalRecordId = exp.personalRecordId;
      const experienceId = exp.experienceId;
      this._authService.deleteExperienceRecordById(personalRecordId, experienceId).subscribe(
        (data) => {
          console.log("Your data is deleted successfully", data);
          this.getAllResumes();
        }, (error) => {
          alert("Something is going wrong with Deleting Experience Record ");
          console.log("Something is going wrong with Deleting Experience Record", error.errorMessage)
        })
    }
  }



  // Delete Language Record By Id
  deleteLanguageRecordById(language: any) {
    if (confirm("Are you sure you want to delete this record")) {
      const personalRecordId = language.personalRecordId;
      const languageId = language.languageId;
      this._authService.deleteLanguageRecordById(personalRecordId, languageId).subscribe(
        (data) => {
          console.log("Your Data is deleted Successfully", data);
          this.getAllResumes();
        }, (error) => {
          console.log(" Something is occured during deleting Language Record", error.errorMessage);
          alert("Something is occured during deleting Language Reocrd");
        }
      )
    }
  }



  // Delete Skill Record By Id
  deleteSkillRecordById(skill: any) {
    if (confirm("Are you sure you want to delete this record")) {
      const personalRecordId = skill.personalRecordId;
      const skillId = skill.skillId;

      this._authService.deleteSkillRecordById(personalRecordId, skillId).subscribe(
        (data) => {
          console.log("Your Data is deleted Successfully", data);
          this.getAllResumes();
        }, (error) => {
          console.log("Something is going wrong with Deleting Skill Record", error.errorMessage);
          alert("Something is going wrong with Deleting Skill Record");
        }
      )
    }
  }




  onLogout(): void {
    this._authService.logout();
    alert("User logout successfully");
  }






























  // Download PDF
  // Method to download as PDF
  async downloadPDF(index: number) {
    const content = document.getElementById(`resume-${index}`); // Use specific resume ID
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`resume_${index + 1}.pdf`); // Dynamic file name
    } else {
      console.error('Resume content not found!');
    }
  }




  // Method to download as PNG
  async downloadPNG(index: number) {
    const content = document.getElementById(`resume-${index}`); // Use specific resume ID
    if (content) {
      const canvas = await html2canvas(content);
      const imgData = canvas.toDataURL('image/png');

      // Create a link element for downloading
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `resume_${index + 1}.png`; // Dynamic file name
      link.click();
    } else {
      console.error('Resume content not found!');
    }
  }


}


