import { Component, SimpleChanges } from '@angular/core';
import { DailystudyService } from '../../services/dailystudy.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, flatMap, forkJoin, from, map, of, switchMap, toArray } from 'rxjs';
import { DailyStudy, DailyStudiesWithCourse } from '../../models/dailyStudy';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css'],
  providers: [DatePipe]
})
export class CourseOverviewComponent {

  selectedDate!: Date;
  data$!: Observable<DailyStudiesWithCourse[]>;
  dailystudy$!: Observable<DailyStudy[]>;
  course$!: Observable<Course[]>;
  selectedDailyStudyId: number = 0;

  constructor(
    private dailyStudyService: DailystudyService,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private datePipe: DatePipe
  ) {
    this.selectedDate = new Date(); // Set selectedDate to the current date
  }

  ngOnInit() {
    this.getDailyStudy();
    this.data$ = this.getDataForDate(this.selectedDate); // Fetch data for the current date
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.data$ = this.getDataForDate(this.selectedDate);
    }
  }
  
  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.data$ = this.getDataForDate(this.selectedDate);
  }

  getDataForDate(date: Date): Observable<DailyStudiesWithCourse[]> {
    console.log('date:', date); // Add this line
    const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
    return this.dailyStudyService.getDailyStudy().pipe(
      switchMap(dailyStudies => {
        // Fetch the course for each dailyStudy
        const dailyStudiesWithCourses = dailyStudies.flatMap(dailyStudy => 
          dailyStudy.courseIDs.map(courseID => 
            this.courseService.getCourseById(courseID).pipe(
              map(course => ({ ...dailyStudy, course }))
            )
          )
        );
        return forkJoin(dailyStudiesWithCourses);
      }),
      map(dailyStudies => dailyStudies.filter(dailyStudy => {
        const dailyStudyDate = moment(dailyStudy.date, 'DD.MM.YYYY').toDate();
        console.log('dailyStudy.date:', dailyStudyDate);
        return this.datePipe.transform(dailyStudyDate, 'dd.MM.yyyy') === formattedDate
      }))
    );
  }

  getDailyStudy() {
    this.dailystudy$ = this.dailyStudyService.getDailyStudy();
  }

  removeCourseFromDailyStudy(dailyStudyId: number, courseId: number) {
    this.dailyStudyService.removeCourseFromDailyStudy(dailyStudyId, courseId).subscribe(
      (x) => {
        this.getDailyStudy();
        this.data$ = this.getDataForDate(this.selectedDate);
      },
    );
  }
}