import { ComponentFixture, TestBed } from '@angular/core/testing';

import { specWorkoutPlanComponent } from './spec-workout-plan.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectSearchModule } from 'mat-select-search';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { WorkoutPlanRoutingModule } from '../workoutplan-routing.module';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { of } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { WorkoutPlanModule } from '../workoutplan.module';

describe('specWorkoutPlan', () => {
  let component: specWorkoutPlanComponent;
  let fixture: ComponentFixture<specWorkoutPlanComponent>;
  let workoutPlanService: WorkoutplanService;
  let exerciseService: ExerciseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
          WorkoutPlanModule,
          WorkoutPlanRoutingModule,
          ReactiveFormsModule,
          MatToolbarModule,
          MatInputModule,
          MatCardModule,
          MatMenuModule,
          MatIconModule,
          MatButtonModule,
          MatTableModule,
          MatSlideToggleModule,
          MatFormFieldModule,
          MatOptionModule,
          FormsModule,
          MatSelectModule,
          MatSelectSearchModule,
          NgxMatSelectSearchModule,
        BrowserAnimationsModule],
      declarations: [specWorkoutPlanComponent],
      providers: [
        { provide: WorkoutplanService, useValue: jasmine.createSpyObj('workoutPlanService',{getWorkoutPlanById: of({}), removeExerciseFromWorkoutPlan: of([null]), addExerciseToWorkoutPlan: of([]) }) },
        { provide: ExerciseService, useValue: jasmine.createSpyObj('exerciseService', {getExercise: of([]), getExerciseById: of({})}) },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1'}} } },


      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(specWorkoutPlanComponent);
    component = fixture.componentInstance;
    workoutPlanService = TestBed.inject(WorkoutplanService);
    exerciseService = TestBed.inject(ExerciseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWorkoutPlanById', () => {
    expect(workoutPlanService.getWorkoutPlanById).toHaveBeenCalled();
  });


  it('should call getExercise', () => {
    expect(exerciseService.getExercise).toHaveBeenCalled();
  });


  it('should toggle showSelect', () => {
    component.showSelect = false;
    component.toggleSelect();
    expect(component.showSelect).toBeTrue();

    component.toggleSelect();
    expect(component.showSelect).toBeFalse();
  });
});
