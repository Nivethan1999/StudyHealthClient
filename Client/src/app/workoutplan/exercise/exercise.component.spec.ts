import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseComponent } from './exercise.component';
import { ExerciseService } from '../../services/exercise.service';
import { WorkoutPlanRoutingModule } from '../workoutplan-routing.module';
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
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;
  let exerciseService: ExerciseService;

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
        NgxMatSelectSearchModule],
      declarations: [ExerciseComponent],
      providers: [
        
        {provide: ExerciseService, useValue: jasmine.createSpyObj('exerciseService', {createExercise: of([]), getExercise : of([])})},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    exerciseService = TestBed.inject(ExerciseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get exercise on init', () => {
    expect(exerciseService.getExercise).toHaveBeenCalled();
  });


});
