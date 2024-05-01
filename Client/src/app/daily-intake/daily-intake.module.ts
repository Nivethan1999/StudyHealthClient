import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DailyIntakeRoutingModule } from './daily-intake-routing.module';
import { DailyIntakeOverviewComponent } from './daily-intake-overview/daily-intake-overview.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';


@NgModule({
  declarations: [
    DailyIntakeOverviewComponent,
    AddFoodComponent
  ],
  imports: [
    CommonModule,
    DailyIntakeRoutingModule,
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
    MatButton
  ]
})
export class DailyIntakeModule { }
