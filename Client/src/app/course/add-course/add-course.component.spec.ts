import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddCourseComponent } from './add-course.component';
import { CourseService } from '../../services/course.service';
import { DailystudyService } from '../../services/dailystudy.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { Course } from '../../models/course';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CourseRoutingModule } from '../course-routing.module';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let courseService: CourseService;
  let dailyStudyService: DailystudyService;
  let router: Router;

  beforeEach(() => {
    const courseServiceMock = {
      getCourse: jasmine.createSpy('getCourse').and.returnValue(of()),
      addCourse: jasmine.createSpy('addCourse').and.returnValue(of())
    };

    const dailyStudyServiceMock = {
      getDailyStudy: jasmine.createSpy('getDailyStudy').and.returnValue(of()),
      createDailyStudy: jasmine.createSpy('createDailyStudy').and.returnValue(of())
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ],
      providers: [
        { provide: CourseService, useValue: courseServiceMock },
        { provide: DailystudyService, useValue: dailyStudyServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder,
        DatePipe
      ],
      imports: [ ReactiveFormsModule, MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        DatePipe,
        MatCardModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        CourseRoutingModule ]
    });

    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.inject(CourseService);
    dailyStudyService = TestBed.inject(DailystudyService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize DailyStudyForm and CourseForm', () => {
    component.ngOnInit();
    expect(component.DailyStudyForm).toBeDefined();
    expect(component.CourseForm).toBeDefined();
  });

  it('should call DailystudyService.createDailyStudy and Router.navigate when registerDailyHours is called', () => {
    const dailyStudyFormValue = { 
      Date: new Date(), 
      Duration: 2,
      CourseIDs: 1
    };
    component.ngOnInit();
    component.DailyStudyForm.setValue(dailyStudyFormValue);
    component.registerDailyHours();
    expect(dailyStudyService.createDailyStudy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/course']);
  });

  it('should call CourseService.addCourse when registerCourse is called', () => {
    const courseFormValue = { 
      Name: 'Test Course', 
      ECTS: 5
    };
   
    const mockCourse: Course = { courseID: 1, name: courseFormValue.Name, ects: courseFormValue.ECTS, dailyStudyID: [1] };
    component.ngOnInit();
    component.CourseForm.setValue(courseFormValue);
    component.registerCourse();
    expect(courseService.addCourse).toHaveBeenCalledWith(jasmine.objectContaining(courseFormValue));
    expect(component.fetchCourses).toHaveBeenCalled();
  });
});