import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseOverviewComponent } from './course-overview.component';
import { DailystudyService } from '../../services/dailystudy.service';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';
import { CourseRoutingModule } from '../course-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CourseOverviewComponent', () => {
  let component: CourseOverviewComponent;
  let fixture: ComponentFixture<CourseOverviewComponent>;
  let dailystudyService: DailystudyService;
  let courseService: CourseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CourseRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        DatePipe,
        MatCardModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
      BrowserAnimationsModule],
      declarations: [ CourseOverviewComponent ],
      providers: [
        DatePipe,
        { provide: DailystudyService, useValue: jasmine.createSpyObj('DailystudyService', { getDailyStudy: of([]), removeCourseFromDailyStudy: of(null) }) },
        { provide: CourseService, useValue: jasmine.createSpyObj('CourseService', { getCourseById: of({}) }) },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOverviewComponent);
    component = fixture.componentInstance;
    dailystudyService = TestBed.inject(DailystudyService);
    courseService = TestBed.inject(CourseService);
    fixture.detectChanges(); // ngOnInit is called here
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get daily study on init', () => {
    expect(dailystudyService.getDailyStudy).toHaveBeenCalled();
  });

  it('should get data for selected date on init', () => {
    expect(component.data$).toBeDefined();
  });

  it('should update data when date changes', () => {
    component.onDateChange({value: new Date()});
    expect(component.data$).toBeDefined();
  });

  it('should remove course from daily study', () => {
    component.removeCourseFromDailyStudy(1, 1);
    expect(dailystudyService.removeCourseFromDailyStudy).toHaveBeenCalledWith(1, 1);
  });

  // it('should get data for selected date', () => {
  //   const date = new Date();
  //   const formattedDate = component.datePipe.transform(date, 'dd.MM.yyyy');
  //   const dailyStudy = { date: formattedDate, courseIDs: [1] };
  //   const course = { id: 1, name: 'Course 1' };
  //   dailystudyService.getDailyStudy.and.returnValue(of([dailyStudy]));
  //   courseService.getCourseById.and.returnValue(of(course));
  
  //   component.getDataForDate(date).subscribe(data => {
  //     expect(data).toEqual([{ ...dailyStudy, course }]);
  //   });
  
  //   expect(dailystudyService.getDailyStudy).toHaveBeenCalled();
  //   expect(courseService.getCourseById).toHaveBeenCalledWith(1);
  // });
  
  // it('should filter out data for other dates', () => {
  //   const date = new Date();
  //   const formattedDate = component.datePipe.transform(date, 'dd.MM.yyyy');
  //   const dailyStudy1 = { date: formattedDate, courseIDs: [1] };
  //   const dailyStudy2 = { date: '01.01.2000', courseIDs: [1] };
  //   const course = { id: 1, name: 'Course 1' };
  //   dailystudyService.getDailyStudy.and.returnValue(of([dailyStudy1, dailyStudy2]));
  //   courseService.getCourseById.and.returnValue(of(course));
  
  //   component.getDataForDate(date).subscribe(data => {
  //     expect(data).toEqual([{ ...dailyStudy1, course }]);
  //   });
  
  //   expect(dailystudyService.getDailyStudy).toHaveBeenCalled();
  //   expect(courseService.getCourseById).toHaveBeenCalledWith(1);
  // });
});