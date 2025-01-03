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
  selectedExtraEducationRecordId : number | null = null;
  updateExEducationModel : ExtraEducationModel = {
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
  SelectedSkillsRecordId  : number | null = null;
  updateSkillRecord : SkillsRecordModel = {
    skillId: 0,
    skillName: '',
    efficiency: '',
    personalRecordId: 0,
    id: 0
  }





  selectedLanguageRecordId : number | null = null;
  updateLanguageModel : LanguageRecordModel = {
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
  editExtraEducation (extra: ExtraEducationModel){
    this.selectedExtraEducationRecordId = extra.exEducationId;
    this.updateExEducationModel = {...extra};
  }

  submitExtraEducationRecord(){
    const {exEducationId, personalRecordId} = this.updateExEducationModel;
    this._authService.updateExtraEducation(exEducationId, personalRecordId, this.updateExEducationModel).subscribe(
      (data)=>{
        console.log("Your Data is Updated Successfully", data);
        this.selectedExtraEducationRecordId = null;
        this.getAllResumes();
      }, (error) => {
        console.log("Error Occured during Extra Education Update API Fetching", error);
      }
    )
  }

  cancelExtraEducationEdit(){
    this.selectedExtraEducationRecordId = null;
    this.updateExEducationModel = {
      exEducationId : 0,
      exEduDegree : '',
      exEduInstitute : '',
      exEduYearOfCompletion : '',
      personalRecordId : 0,
      id: 0
    }
  }



  // Edit Experience Record
  editExperienceRecord(exp : ExperienceRecordModel){
    this.SelectedExperienceRecordId  = exp.experienceId;
    this.updateExperience = {...exp};
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
  cancelExperienceEdit(){
    this.SelectedExperienceRecordId = null;
    this.updateExperience = {
      experienceId : 0,
      jobTitle : '',
      location : '',
      yearsOfExperience : '',
      personalRecordId : 0,
      id : 0
    }
  }






  // Edit Skills Records 
  editSkillsRecords (skill : SkillsRecordModel){
    this.SelectedSkillsRecordId = skill.skillId;
    this.updateSkillRecord = {...skill};
  };

  submitSkillsRecord(){
    const {skillId, personalRecordId} = this.updateSkillRecord;
    this._authService.updateSkillsRecord(skillId, personalRecordId, this.updateSkillRecord).subscribe(
      (data)=>{
        console.log("Your Data is Updated Successfully", data);
        this.SelectedSkillsRecordId = null;
        this.getAllResumes();
      }, (error)=> {
        console.log("Error Occured during Skills Update API Fetching", error);
      }
    )
  }

  cancelSkillsEdit(){
    this.SelectedSkillsRecordId = null;
    this.updateSkillRecord = {
      skillId : 0,
      skillName : '',
      efficiency : '',
      personalRecordId : 0,
      id : 0
    } 
  }






  // Update Language Record

  editLanguageRecord(language : LanguageRecordModel){
    this.selectedLanguageRecordId = language.languageId;
    this.updateLanguageModel = {...language};
  }

  submitLanguageRecord(){
    const { languageId , personalRecordId} = this.updateLanguageModel;
    this._authService.updateLanguageRecord(languageId, personalRecordId, this.updateLanguageModel).subscribe(
      (data)=>{
        console.log("Your Record is Updated Successfully", data);
        this.selectedLanguageRecordId = null;
        this.getAllResumes();
      }, (error)=> {
        console.log("Error Occured during update languge API Fetching", error);
      }
    )
  }

  cancelLanguageEdit(){
    this.selectedLanguageRecordId = null;
    this.updateLanguageModel = {
      languageId : 0,
      languageName : '',
      personalRecordId : 0,
      id : 0
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



  currentIndex : number = 0;
  totalResumes : number = 3;
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










  // Delete Education Record Only
  deleteEducationRecord(edu:any) {
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

  onLogout(): void {
    this._authService.logout();
    alert("User logout successfully");
  }

}
