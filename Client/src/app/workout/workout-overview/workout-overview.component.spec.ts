import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutOverviewComponent } from './workout-overview.component';
import { WorkoutService } from '../../services/workout.service';
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
import { WorkoutplanService } from '../../services/workoutplan.service';
import { ActivatedRoute } from '@angular/router';

describe('WorkoutOverviewComponent', () => {
  let component: WorkoutOverviewComponent;
  let fixture: ComponentFixture<WorkoutOverviewComponent>;
  let workoutService: WorkoutService;
  let workoutPlanService: WorkoutplanService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutRoutingModule,
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
        BrowserAnimationsModule,
      ],
      declarations: [WorkoutOverviewComponent],
      providers: [
        {provide: WorkoutService, useValue: jasmine.createSpyObj('workoutService', {getWorkout: of([]), delete: of(null)})},
        {provide: WorkoutplanService, useValue: jasmine.createSpyObj('workoutPlanService', {getWorkoutPlanById: of([]) })},
        { provide: ActivatedRoute, useValue: { params: of({}) } },],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutOverviewComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    workoutPlanService = TestBed.inject(WorkoutplanService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get workout', () => {
    component.getWorkout();
    expect(workoutService.getWorkout).toHaveBeenCalled();
  });

  it('should delete workout', () => {
    
    component.deleteWorkout(1);
    expect(workoutService.delete).toHaveBeenCalledWith(1);
  });
});
