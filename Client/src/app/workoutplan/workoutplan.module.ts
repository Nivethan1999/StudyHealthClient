import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutPlanRoutingModule } from './workoutplan-routing.module';
import { ExerciseComponent } from './exercise/exercise.component';
import { AddWorkoutplanComponent } from './addworkoutplan/addworkoutplan.component';
import { AppModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { WorkoutplanlistComponent } from './workoutplanlist/workoutplanlist.component';
import {specWorkoutPlanComponent} from "./specWorkoutPlan/spec-workout-plan.component";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';




@NgModule({
  declarations: [
    ExerciseComponent,
    AddWorkoutplanComponent,
    WorkoutplanlistComponent,
    specWorkoutPlanComponent,
    

  ],
  imports: [
    CommonModule,
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
    NgxMatSelectSearchModule
  ]
})
export class WorkoutPlanModule { }
