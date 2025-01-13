import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth_Pages/register/register.component';
import { LoginComponent } from './Auth_Pages/login/login.component';
import { DashboardComponent } from './Auth_Pages/dashboard/dashboard.component';
import { authGuard } from './Auth_Folders/Guard_Folder/guards/auth.guard';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { ResumeTemplatesComponent } from './Pages/resume-templates/resume-templates.component';
import { ResumesComponent } from './Auth_Pages/resumes/resumes.component';
import { FinalResumesComponent } from './Auth_Pages/final-resumes/final-resumes.component';

export const routes: Routes = [
    {path:'', component:LandingPageComponent, pathMatch:'full'},
    {path: 'landingPage', component:LandingPageComponent},
    {path: 'resumeTemplates', component : ResumeTemplatesComponent},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent, canActivate:[authGuard]},
    {path: 'resumes', component:ResumesComponent, canActivate:[authGuard]},
    {path: 'final_resumes', component:FinalResumesComponent, canActivate:[authGuard]},
    {path:'**', component:RegisterComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}