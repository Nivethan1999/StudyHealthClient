import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WorkoutRoutingModule } from './workout-routing.module';
import { WorkoutOverviewComponent } from './workout-overview/workout-overview.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOption, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    WorkoutOverviewComponent,
    AddWorkoutComponent
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    DatePipe,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule

    
    
  ]
})
export class WorkoutModule { }
