import { ChangeDetectorRef, Component } from '@angular/core';
import { WorkoutService } from '../services/workout.service';
import { DailystudyService } from '../services/dailystudy.service';
import { DailyIntakeService } from '../services/daily-intake.service';
import { Observable, map } from 'rxjs';
import { Workout } from '../models/workout';
import { DailyIntake } from '../models/dailyIntake';
import { DailyStudy } from '../models/dailyStudy';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCard, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
  workoutData$!: Observable<number>
  dailystudyData$!: Observable<number>
  dailyIntakeData$!: Observable<number>

  weeklyWorkoutData: number[] = []; // Populate with your data
  weeklyStudyData: number[] = []; // Populate with your data
  weeklyIntakeData: number[] = []; // Populate with your data

  weeklyLabels: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  chartOptions: ChartOptions = {
    responsive: true,
  };

  chartType: ChartType = 'line'; // or 'bar', 'pie', etc.
  chartLegend = true;
  chartPlugins = [];

  constructor(
    private workoutService: WorkoutService,
    private dailystudyService: DailystudyService,
    private dailyintakeService: DailyIntakeService

  ){}

  ngOnInit(): void {
    this.workoutService.getWorkout().subscribe((data: Workout[]) => {
      console.log('Workout data:', data);
      this.weeklyWorkoutData = this.filterCurrentWeekData(data, 'duration');
      
    });
    
    this.dailystudyService.getDailyStudy().subscribe((data: DailyStudy[]) => {
      console.log('Study data:', data);
      this.weeklyStudyData = this.filterCurrentWeekData(data, 'duration');
      
    });
    
    this.dailyintakeService.getDailyIntake().subscribe((data: DailyIntake[]) => {
      console.log('Intake data:', data);
      this.weeklyIntakeData = this.filterCurrentWeekData(data, 'caloriesEaten');
      
    });

    

    this.workoutData$ = this.workoutService.getWorkout().pipe(
      map(data => {
        const currentDate = this.getCurrentDate();
        const filteredData = data.filter((item: any) => item.date === currentDate);
        const totalDuration = filteredData.reduce((acc: number, curr: any) => acc + curr.duration, 0);
        return totalDuration;
      })
    );

    this.dailystudyData$ = this.dailystudyService.getDailyStudy().pipe(
      map(data => {
        const currentDate = this.getCurrentDate();
        const studySessionsForCurrentDate = data.filter((item: any) => item.date === currentDate);
        const totalDuration = studySessionsForCurrentDate.reduce((acc: number, curr: DailyStudy) => acc + curr.duration, 0);
        return totalDuration;
      })
    );

    this.dailyIntakeData$ = this.dailyintakeService.getDailyIntake().pipe(
      map(data => {
        const currentDate = this.getCurrentDate();
        const studySessionsForCurrentDate = data.filter((item: any) => item.date === currentDate);
        const totalCalories = studySessionsForCurrentDate.reduce((acc: number, curr: DailyIntake) => acc + curr.caloriesEaten, 0);
        return totalCalories;
      })
    );
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${day}.${month}.${year}`;
  }

  filterCurrentWeekData(data: any[], property: string): number[] {
    const currentWeekNumber = this.getCurrentWeekNumber();
    
    // Group data by date
    const groupedData = data.reduce((acc, item) => {
      const dateParts = item.date.split(".");
      const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      if (this.getWeekNumber(date) === currentWeekNumber) {
        acc[item.date] = (acc[item.date] || 0) + item[property];
      }
      return acc;
    }, {});
  
    // Ensure data for entire week
    const weekData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - ((date.getDay() + 6) % 7) + i);  // Adjust for week starting on Monday
      const dateString = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
      weekData.push(groupedData[dateString] || 0);
    }
  
    return weekData;
  }
  
  getCurrentWeekNumber(): number {
    const now = new Date();
    const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
  
  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  


  
}




