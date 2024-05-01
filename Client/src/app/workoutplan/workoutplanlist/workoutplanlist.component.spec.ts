import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutplanlistComponent } from './workoutplanlist.component';
import { WorkoutplanService } from '../../services/workoutplan.service';
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
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('WorkoutplanlistComponent', () => {
  let component: WorkoutplanlistComponent;
  let fixture: ComponentFixture<WorkoutplanlistComponent>;
  let workoutplanService: WorkoutplanService;
  

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
      declarations: [WorkoutplanlistComponent],
      providers: [
        {provide: WorkoutplanService, useValue: jasmine.createSpyObj('WorkoutplanService', {getWorkoutPlan: of([]) })},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutplanlistComponent);
    component = fixture.componentInstance;
    workoutplanService = TestBed.inject(WorkoutplanService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get workoutPlan on init', () => {
    expect(workoutplanService.getWorkoutPlan).toHaveBeenCalled();
  });
});
