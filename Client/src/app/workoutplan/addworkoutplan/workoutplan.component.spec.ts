import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkoutplanComponent } from './addworkoutplan.component';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { ExerciseService } from '../../services/exercise.service';
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
import { MatSelectSearchModule } from 'mat-select-search';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { WorkoutPlanRoutingModule } from '../workoutplan-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Router } from '@angular/router';
describe('AddWorkoutplanComponent', () => {
  let component: AddWorkoutplanComponent;
  let fixture: ComponentFixture<AddWorkoutplanComponent>;
  let workoutPlanService: WorkoutplanService;
  let exerciseService: ExerciseService;
  let router: jasmine.SpyObj<Router>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutPlanRoutingModule,
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
      declarations: [AddWorkoutplanComponent],
      providers: [
        {provide: ExerciseService, useValue: jasmine.createSpyObj('exerciseService', {getExercise: of([]) })},
        {provide: WorkoutplanService, useValue: jasmine.createSpyObj('workoutPlanService', {createWorkoutPlan: of([]) })},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWorkoutplanComponent);
    component = fixture.componentInstance;
    workoutPlanService = TestBed.inject(WorkoutplanService);
    exerciseService = TestBed.inject(ExerciseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch exercises', () => {
    component.fetchExercises();
    expect(exerciseService.getExercise).toHaveBeenCalled();
  });

  // it('should register data', () => {
  //   workoutPlanService.createWorkoutPlan.and.returnValue(of(null));
  //   component.WorkoutPlanForm.setValue({
  //     WorkoutName: 'test',
  //     ExerciseIDs: [1]
  //   });
  //   component.onRegisterData();
  //   expect(workoutPlanService.createWorkoutPlan).toHaveBeenCalledWith(component.WorkoutPlanForm.value);
  //   expect(router.navigate).toHaveBeenCalledWith(['/workoutplan']);
  // });

});
