import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth_Service/auth.service';
import { CommonModule } from '@angular/common';
import { FinalResume } from '../../Models/final-resume';
import { PersonalRecordModel } from '../../Models/personal-record-model';
import { EducationRecordModel } from '../../Models/education-record-model';
import { ExperienceRecordModel } from '../../Models/experience-record-model';
import { ExtraEducationModel } from '../../Models/extra-education-model';
import { SkillsRecordModel } from '../../Models/skills-record-model';
import { LanguageRecordModel } from '../../Models/language-record-model';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { error } from 'console';
import { User } from '../../Auth_Folders/Auth_Model/user';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  personalRecords: PersonalRecordModel = {
    personalRecordId: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    imagePath: '',
    intro: '',
    id: 0
  };
  

  educationRecords: EducationRecordModel[] = [{
    educationId       :     0,
    degree            :    '',
    institute         :    '',
    yearOfCompletion  :    '',
    gpa               :    '',
    personalRecordId  :     0,
    id                :     0
  }];

  extraEducations: ExtraEducationModel[] = [{
    exEducationId     :     0,
    exEduDegree       :     '',
    exEduInstitute    :     '',
    exEduYearOfCompletion:  '',
    personalRecordId  :      0,
    id                :      0
  }];

  experienceRecords: ExperienceRecordModel[] = [{
    experienceId: 0,
    jobTitle: '',
    location: '',
    role : '',
    description: '',
    technologies: '',
    yearsOfExperience: '',
    personalRecordId: 0,
    id: 0
  }];

  skillsRecords: SkillsRecordModel[] = [{
    skillId: 0,
    skillName: '',
    efficiency: '',
    personalRecordId: 0,
    id: 0
  }];

  languageRecords: LanguageRecordModel[] = [{
    languageId: 0,
    languageName: '',
    personalRecordId: 0,
    id: 0
  }];

  errorMessage: string | null = null;
  formSubmitted: boolean = false;
  // currentSection: string = 'education'; // default section is 'education';
  closeFormm:boolean = false;
  isFormVisible : boolean = false;


  isSidebarOpen: boolean = false;

  currentStep :number = 1;





  constructor(private _authService: AuthService, private route:Router)  { }
  
  goToNextStep():void{
    if(this.currentStep < 6){
      this.currentStep++;
    }
  }

  goToBackStep(){
    if(this.currentStep > 1){
      this.currentStep--;
    }
  }




  //  // Section visibility states
  //  showSection(section: string) {
  //   this.currentSection = section;
  // }

  // showForm(){
  //   this.currentSection;
  // }
  
// Toggle Sidebar 
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  // Display Create resume form
  DisplayForm(){
    this.isFormVisible = true;
  }
  toggleForm(){
    this.isFormVisible = !this.isFormVisible;
  }




  addResume() {
  // Ensure personalRecords contains valid data before sending
  if (!this.personalRecords.name || !this.personalRecords.email || !this.personalRecords.phone) {
    this.errorMessage = 'Name, email, and phone are required fields.';
    return;
  }

  const resume: FinalResume = {
    personalRecord: this.personalRecords,
    educations: this.educationRecords,
    extraEducations: this.extraEducations,
    experience: this.experienceRecords,
    skills: this.skillsRecords,
    languages: this.languageRecords
  };

  console.log(resume); // Log the resume object to check its structure.

  // Check if the user is logged in by checking for a JWT token
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    this.errorMessage = "You need to log in to add a resume.";
    return;
  }

  this._authService.addData(resume).subscribe({
    next: (response) => {
      console.log("Data has been added", response);
      this.formSubmitted = true;
      this.resetForm();
      

      // Navigate resume after adding 
      this.route.navigate(['/resumes']);
      setTimeout(() => {
        this.formSubmitted = false;
      }, 2000);
    },
    error: (err) => {
      console.error('Error adding resume:', err);
      if (err.status === 400 && err.error.errors) {
        console.error('Validation errors:', err.error.errors);
        alert('Validation errors occurred. Check the console for details.');
      } else {
        alert('An error occurred while adding the resume.');
      }
    }
  });
}



addEducation (){
  this.educationRecords.push({
    degree            :   '',
    institute         :   '', 
    yearOfCompletion  :   '', 
    gpa               :   '', 
    educationId       :   0, 
    personalRecordId  :   0,
    id                :   0
  })
}
removeEducationField(index:number){
  this.educationRecords.splice(index, 1);
}


addExtraEducation(){
  this.extraEducations.push({
    exEducationId           :    0,
    exEduDegree             :   '',
    exEduInstitute          :   '',
    exEduYearOfCompletion   :   '',
    personalRecordId        :    0,
    id                      :    0
  })
}

removeExtraEducation(index:number){
  this.extraEducations.splice(index, 1);
}




addExperienceRecord(){
  this.experienceRecords.push({
    experienceId        :    0,
    jobTitle            :   '',
    location            :   '',
    role                :   '',
    description         :   '',
    technologies        :   '',
    yearsOfExperience   :   '',
    personalRecordId    :    0,
    id                  :    0
  })
}

removeExperienceRecord(index:number){
  this.experienceRecords.splice(index,1);
}



addSkillsRecord(){
  this.skillsRecords.push({
    skillId             :    0,
    skillName           :   '',
    efficiency          :   '',
    personalRecordId    :    0,
    id                  :    0
  })
}

removeSkillsRecord(index:number){
  this.skillsRecords.splice(index,1);
}



addLanguageRecord(){
this.languageRecords.push({
  languageId          :    0,
  languageName        :   '',
  personalRecordId    :    0,
  id                  :    0
})
}

removeLanguageRecord(index:number){
  this.languageRecords.splice(index, 1);
}


resetForm(){
  this.personalRecords = { name:'', email: '', phone: '', address: '', intro: '', imagePath: '', id:0, personalRecordId:0},
  this.educationRecords = [{
    educationId         :    0,
    degree              :   '',
    institute           :   '',
    yearOfCompletion    :   '',
    gpa                 :   '',
    personalRecordId    :    0,
    id                  :    0
  }];

  this.extraEducations = [{
    exEducationId           :    0,
    exEduDegree             :   '',
    exEduInstitute          :   '',
    exEduYearOfCompletion   :   '',
    personalRecordId        :    0,
    id                      :    0
  }];

  this.experienceRecords = [{
    experienceId            :    0,
    jobTitle                :   '',
    location                :   '',
    role                    :   '',
    description             :   '',
    technologies            :   '',
    yearsOfExperience       :   '',
    personalRecordId        :    0,
    id                      :    0
  }];

  this.skillsRecords = [{
    skillId                 :    0,
    skillName               :   '',
    efficiency              :   '',
    personalRecordId        :    0,
    id                      :    0
  }];

  this.languageRecords= [{
    languageId              :    0,
    languageName            :   '',
    personalRecordId        :    0,
    id                      :    0
  }];

}













  onLogout(): void {
    this._authService.logout();
    alert("User logout successfully");
  }

}
