import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { DailyStudy } from '../../models/dailyStudy';
import { DailystudyService } from '../../services/dailystudy.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  providers: [DatePipe],
})
export class AddCourseComponent {

  Courses$!: Observable<Course[]>;
  DailyStudy$!: Observable<DailyStudy[]>;
  DailyStudyForm!: FormGroup;
  CourseForm!: FormGroup;
  formattedDate: string = '';


  constructor(private courseService: CourseService,
     private fb: FormBuilder,
     private router: Router,
     private dailyStudyService: DailystudyService,
     private datePipe: DatePipe) { }

  
  ngOnInit(): void {
    this.fetchCourses();
    this.fetchDailyStudy();
    this.DailyStudyForm = this.fb.group({
      'Date': ['', [Validators.required]],
      'Duration': [null, Validators.required], 
      'CourseIDs': [null, Validators.required],
    });
    this.CourseForm = this.fb.group({
      'Name': ['', [Validators.required]],
      'ECTS': [0 , [Validators.required]],
    });
    
}

fetchCourses() {
  this.Courses$ = this.courseService.getCourse();
}

fetchDailyStudy() {
  this.DailyStudy$ = this.dailyStudyService.getDailyStudy();
}



registerDailyHours() {
  if (this.DailyStudyForm.valid) {
    let dailyStudyData = this.DailyStudyForm.value;

    this.formattedDate = this.datePipe.transform(
      dailyStudyData.Date,
      'dd.MM.yyyy'
    )!;

    dailyStudyData.Date = this.formattedDate;

    dailyStudyData.CourseIDs = [dailyStudyData.CourseIDs];

    this.dailyStudyService.createDailyStudy(dailyStudyData).subscribe(() => {
      this.router.navigate(['/course']);
    });
  }
}


registerCourse() {
  if (this.CourseForm.valid) {
    this.courseService.addCourse(this.CourseForm.value).subscribe(() => {
      this.fetchCourses();
    });
  }
}
}
