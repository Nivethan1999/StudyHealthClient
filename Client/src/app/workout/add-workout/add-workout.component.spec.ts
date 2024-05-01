import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { WorkoutModule } from '../workout.module';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WorkoutRoutingModule } from '../workout-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: WorkoutService;
  let workoutPlanService: WorkoutplanService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutModule, WorkoutRoutingModule,
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
      declarations: [AddWorkoutComponent],
      providers: [
        {provide: WorkoutService, useValue: jasmine.createSpyObj('workoutService', {addWorkout: of([]) })},
        {provide: WorkoutplanService, useValue: jasmine.createSpyObj('workoutPlanService', {getWorkoutPlan: of([]) })},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    workoutPlanService = TestBed.inject(WorkoutplanService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch workout plan on init', () => {
    component.ngOnInit();
    expect(workoutPlanService.getWorkoutPlan).toHaveBeenCalled();
  });

  it('should register workout', () => {
    component.WorkoutForm.setValue({
      Date: '2022-01-01',
      Duration: 60,
      WorkoutPlanID: 1
    });
    component.registerWorkout();
    expect(workoutService.addWorkout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/workout']);
  });

  
});
