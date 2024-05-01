import { Course } from "./course";

export interface DailyStudy {
    dailyStudyID: number
    date: Date
    duration: number
    courseIDs: number[]
  }

  export interface DailyStudiesWithCourse extends DailyStudy { 
    course: Course;
  }