import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CourseOverviewComponent,
    AddCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
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
export class CourseModule { }
