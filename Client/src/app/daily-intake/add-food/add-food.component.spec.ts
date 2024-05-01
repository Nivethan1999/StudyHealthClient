import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFoodComponent } from './add-food.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { DailyIntakeService } from '../../services/daily-intake.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Food } from '../../models/food';
import { DailyIntake } from '../../models/dailyIntake';
; 


describe('AddFoodComponent', () => {
  let component: AddFoodComponent;
  let fixture: ComponentFixture<AddFoodComponent>;
  let foodService: jasmine.SpyObj<FoodService>;
  let dailyIntakeService: jasmine.SpyObj<DailyIntakeService>;
  let router: jasmine.SpyObj<Router>;
  let mockDatePipe = { transform: jasmine.createSpy('transform') };


  beforeEach(async () => {
    const mockFoodService = jasmine.createSpyObj('FoodService', ['getFood', 'createFood']);
    mockFoodService.getFood.and.returnValue(of([]));
    mockFoodService.createFood.and.returnValue(of({}));

    const mockDailyIntakeService = jasmine.createSpyObj('DailyIntakeService', ['getDailyIntake', 'createDailyIntake']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ AddFoodComponent ],
      imports: [ 
        HttpClientTestingModule, 
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        DatePipe,
        { provide: FoodService, useValue: mockFoodService },
        { provide: DailyIntakeService, useValue: mockDailyIntakeService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    foodService = TestBed.inject(FoodService) as jasmine.SpyObj<FoodService>;
    dailyIntakeService = TestBed.inject(DailyIntakeService) as jasmine.SpyObj<DailyIntakeService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the daily intake service', () => {
    component.fetchDailyIntake();
    expect(dailyIntakeService.getDailyIntake).toHaveBeenCalledTimes(2);
  });

  describe('fetchFood', () => {
    it('should call the food service', () => {
      component.fetchFood();
      expect(foodService.getFood).toHaveBeenCalledTimes(2);
    });

    it('should set the food observable', (done) => {
      component.fetchFood();
      component.Food$.subscribe(value => {
        expect(value).toEqual([]);
        done();
      });
    });
  });

  describe('registerFood()', () => {
    beforeEach(() => {
      spyOn(component, 'fetchFood').and.callThrough();
    });
  
    it('should not call createFood() when the form is invalid', () => {
      component.FoodForm.setValue({ Name: '', Calories: null });
      component.registerFood();
      expect(foodService.createFood).not.toHaveBeenCalled();
    });
  
    it('should call createFood() and fetchFood() when the form is valid', () => {
      const foodFormValue = { Name: 'Food Name', Calories: 100 };
      const mockFood: Food = { foodID: 1, name: foodFormValue.Name, calories: foodFormValue.Calories, dailyIntakeID: [1] };
      component.FoodForm.setValue(foodFormValue);
      
      foodService.createFood.and.returnValue(of(mockFood));
      
      component.registerFood();
      
      expect(foodService.createFood).toHaveBeenCalledWith(jasmine.objectContaining(foodFormValue));
      expect(component.fetchFood).toHaveBeenCalled();
    });
  });


});