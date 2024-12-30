import { EducationRecordModel } from "./education-record-model";
import { ExperienceRecordModel } from "./experience-record-model";
import { ExtraEducationModel } from "./extra-education-model";
import { LanguageRecordModel } from "./language-record-model";
import { PersonalRecordModel } from "./personal-record-model";
import { SkillsRecordModel } from "./skills-record-model";

export interface FinalResume {
  personalRecord: PersonalRecordModel;  // singular because your data suggests a single object, not an array
  educations: EducationRecordModel[];
  extraEducations: ExtraEducationModel[];
  experience: ExperienceRecordModel[];
  skills: SkillsRecordModel[];
  languages: LanguageRecordModel[];
}
