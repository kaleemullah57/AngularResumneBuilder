import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FinalResume } from '../../Models/final-resume';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resume-templates.component.html',
  styleUrl: './resume-templates.component.css'
})
export class ResumeTemplatesComponent  {

  finalResume : FinalResume[] = [];
  formats = [
    {label : 'format1', value : 'format1'},
    {label : 'format2', value : 'format2'},
    {label : 'format3', value : 'format3'}
  ];

  selectedFormat : string = 'format2';
 
  

  onChangeFormat():void{
    this.selectedFormat;
  }
}
