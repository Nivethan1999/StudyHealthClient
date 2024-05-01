import { TestBed } from '@angular/core/testing';
import { DailyIntakeOverviewComponent } from './daily-intake-overview.component';
import { DailyIntakeService } from '../../services/daily-intake.service';
import { FoodService } from '../../services/food.service';
import { of } from 'rxjs';
import { SimpleChange } from '@angular/core';
import { DailyIntakeModule } from '../daily-intake.module';
import { DailyIntakeRoutingModule } from '../daily-intake-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DailyIntake } from '../../models/dailyIntake';

describe('DailyIntakeOverviewComponent', () => {
  let component: DailyIntakeOverviewComponent;
  let dailyIntakeService: jasmine.SpyObj<DailyIntakeService>;
  let foodService: jasmine.SpyObj<FoodService>;

  beforeEach(() => {
    const dailyIntakeSpy = jasmine.createSpyObj('DailyIntakeService', ['getDailyIntake', 'removeFoodFromDailyIntake']);
    const foodSpy = jasmine.createSpyObj('FoodService', ['getFood', 'getFoodById']);

    TestBed.configureTestingModule({
      imports: [DailyIntakeModule, DailyIntakeRoutingModule,
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
        MatButton],
      providers: [
        DatePipe,
        DailyIntakeOverviewComponent,
        { provide: DailyIntakeService, useValue: dailyIntakeSpy },
        { provide: FoodService, useValue: foodSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    });

    component = TestBed.inject(DailyIntakeOverviewComponent);
    dailyIntakeService = TestBed.inject(DailyIntakeService) as jasmine.SpyObj<DailyIntakeService>;
    foodService = TestBed.inject(FoodService) as jasmine.SpyObj<FoodService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDailyIntake on ngOnInit', () => {
    dailyIntakeService.getDailyIntake.and.returnValue(of([]));
    component.ngOnInit();
    expect(dailyIntakeService.getDailyIntake).toHaveBeenCalled();
  });

  it('should call getDailyIntake and getDataForDate on ngOnChanges', () => {
    dailyIntakeService.getDailyIntake.and.returnValue(of([]));
    component.ngOnChanges({selectedDate: new SimpleChange(null, new Date(), false)});
    expect(dailyIntakeService.getDailyIntake).toHaveBeenCalled();
  });

  it('should call getDailyIntake and getDataForDate on onDateChange', () => {
    dailyIntakeService.getDailyIntake.and.returnValue(of([]));
    component.onDateChange({value: new Date()});
    expect(dailyIntakeService.getDailyIntake).toHaveBeenCalled();
  });

  it('should call getFood on getFood', () => {
    foodService.getFood.and.returnValue(of([]));
    component.getFood();
    expect(foodService.getFood).toHaveBeenCalled();
  });

  

  
});