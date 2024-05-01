import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { WorkoutService } from '../services/workout.service';
import { DailystudyService } from '../services/dailystudy.service';
import { DailyIntakeService } from '../services/daily-intake.service';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let workoutService: WorkoutService;
  let dailystudyService: DailystudyService;
  let dailyintakeService: DailyIntakeService;
  
  beforeEach(async () => {
  await TestBed.configureTestingModule({
      imports: [CommonModule, 
        MatCard, 
        BaseChartDirective, 
        DashboardComponent], 
      providers: [
        { provide: WorkoutService, useValue: jasmine.createSpyObj('WorkoutService',{getWorkout: of([]) })},
        { provide: DailystudyService, useValue: jasmine.createSpyObj('DailystudyService', { getDailyStudy: of([])})},
        { provide: DailyIntakeService, useValue: jasmine.createSpyObj('DailyIntakeService',{getDailyIntake: of([])})}
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
  
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    dailystudyService = TestBed.inject(DailystudyService);
    dailyintakeService = TestBed.inject(DailyIntakeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWorkout on init', () => {
    expect(workoutService.getWorkout).toHaveBeenCalled()
    expect(dailystudyService.getDailyStudy).toHaveBeenCalled()
    expect(dailyintakeService.getDailyIntake).toHaveBeenCalled()
  });

  it('should get current date', () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const expectedDate = `${day}.${month}.${year}`;

    expect(component.getCurrentDate()).toEqual(expectedDate);
  });

  it('should filter current week data', () => {
    const data = [
      { date: '01.01.2022', value: 10 },
      { date: '02.01.2022', value: 20 },
      // Add more data as needed
    ];
    const property = 'value';
    const result = component.filterCurrentWeekData(data, property);

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toEqual(7);
  });

  it('should get current week number', () => {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    const expectedWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

    expect(component.getCurrentWeekNumber()).toEqual(expectedWeekNumber);
  });

  it('should get week number of a date', () => {
    const date = new Date('2022-01-01');
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    const expectedWeekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);

    expect(component.getWeekNumber(date)).toEqual(expectedWeekNumber);
  });
});