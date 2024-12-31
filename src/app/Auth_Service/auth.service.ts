import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../Auth_Folders/Auth_Model/user';
import { error } from 'console';
import { FinalResume } from '../Models/final-resume';
import { ExperienceRecordModel } from '../Models/experience-record-model';
import { EducationRecordModel } from '../Models/education-record-model';
import { ExtraEducationModel } from '../Models/extra-education-model';
import { Token } from '@angular/compiler';
import { SkillsRecordModel } from '../Models/skills-record-model';
import { LanguageRecordModel } from '../Models/language-record-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAPIUrl = "https://localhost:7299/api/Auth/register";
  private userLoginAPIUrl = "https://localhost:7299/api/Auth/login";


  private getAllResumesURL = "https://localhost:7299/api/FinalResume/GetAllDataOfLoggedIn";
  private addResumeUrl = "https://localhost:7299/api/FinalResume/AddResume"
  private deleteResumeUrl = "https://localhost:7299/api/FinalResume/DeleteRecords"


  private updateEducationUrl = 'https://localhost:7299/api/FinalResume/UpdateEducationRecord';
  private updateExperienceUrl = "https://localhost:7299/api/FinalResume/UpdateExperienceRecord";
  private updateExtraEducationUrl = "https://localhost:7299/api/FinalResume/UpdateExtraEducation";
  private updateSkillsUrl = "https://localhost:7299/api/FinalResume/UpdateSkillsRecord";
  private updateLanguageUrl = "https://localhost:7299/api/FinalResume/UpdateLanguageRecord";



  private deleteEducationRecord = "https://localhost:7299/api/FinalResume/DeleteOnlyEducationRecord"


  private getAllRegisteredUsersUrl = "https://localhost:7299/api/FinalResume/GetAllRegisteredUsers";
  constructor(private http: HttpClient, private route: Router) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.userAPIUrl}`, user);
  }




  login(email: string, password: string): Observable<FinalResume[]> {
    const loginData = { email, password };
    console.log(email, password);
    return this.http.post<FinalResume[]>(this.userLoginAPIUrl, loginData);
  }



  logout(): void {
    localStorage.removeItem("jwtToken");
    this.route.navigate(['/login']);
  }


  getAllRegisteredUsers():Observable<number>{
    const token = localStorage.getItem('jwtToken');
    if(!token){
      throw new Error("First to register Your Self");
    } 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<number>(this.getAllRegisteredUsersUrl, {headers:headers});
  }






  addData(finalResume: FinalResume): Observable<FinalResume> {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("User not logged in");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<FinalResume>(this.addResumeUrl, finalResume, { headers });
  }


  // Update Education Record
  updateEducationRecord(
    educationId: number,
    personalRecordId: number,
    updatedEducation: EducationRecordModel
  ): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('User not logged in');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const url = `${this.updateEducationUrl}/${educationId}/${personalRecordId}`;
    return this.http.put(url, updatedEducation, { headers });
  }



  // Update Extra Education
  updateExtraEducation
    (
      exEducationId: number,
      personalRecordId: number,
      updateExEducationModel: ExtraEducationModel
    ): Observable<any> {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error("User not Authorized");
      }
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      const url = `${this.updateExtraEducationUrl}/${exEducationId}/${personalRecordId}`;
      return this.http.put(url, updateExEducationModel, { headers });
  
    }



  // Update Extra Education Record
  updateExperienceRecord(
    experienceId: number,
    personalRecordId: number,
    updatedExperience: ExperienceRecordModel
  ): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error("User not Authorized");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const url = `${this.updateExperienceUrl}/${experienceId}/${personalRecordId}`;
    return this.http.put(url, updatedExperience, { headers });

  }


  // Update Skills Record
  updateSkillsRecord (
    skillId: number,
    personalRecordId : number,
    updateSkillRecord : SkillsRecordModel
  ): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error("User not Authorized");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const url = `${this.updateSkillsUrl}/${skillId}/${personalRecordId}`;
    return this.http.put(url, updateSkillRecord, { headers });
  }



  // Update Languge record
  updateLanguageRecord(
    languageId : number,
    personalRecordId : number,
    updateLanguageModel : LanguageRecordModel
  ): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error("User not Authorized");
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const url = `${this.updateLanguageUrl}/${languageId}/${personalRecordId}`;
    return this.http.put(url, updateLanguageModel, { headers });
  }




  getAllResumes(): Observable<FinalResume[]> {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("User Not LoggedIn");
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<FinalResume[]>(this.getAllResumesURL, { headers });
  }



  deleteResume(personalRecordId: number): Observable<any> {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("User Not Logged In");
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.deleteResumeUrl}/${personalRecordId}`;

    // Specify responseType as 'text' to handle plain text responses
    return this.http.delete(url, { headers, responseType: 'text' });
  }



  deleteEducationRecordOnly(personalRecordId : number, educationId : number){
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error("User is Not loggedIn");
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.deleteEducationRecord}/${personalRecordId}/${educationId}`;
    return this.http.delete(url, { headers });
  }
}
