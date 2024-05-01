import { Component, SimpleChanges } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Workout } from '../../models/workout';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { WorkoutWithPlan } from '../../models/workout';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-workout-overview',
  templateUrl: './workout-overview.component.html',
  styleUrl: './workout-overview.component.css',
  providers: [DatePipe]
})
export class WorkoutOverviewComponent {

  workout$!: Observable<Workout[]>;

  selectedDate!: Date;
  data!: Observable<WorkoutWithPlan[]>;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private workoutPlanService: WorkoutplanService,
    private datePipe: DatePipe
  ) {
    this.selectedDate = new Date(); // Set selectedDate to the current date
  }

  ngOnInit() {
    
    this.getWorkout();
    this.data = this.getDataForDate(this.selectedDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.data = this.getDataForDate(this.selectedDate);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.data = this.getDataForDate(this.selectedDate);
  }

  getDataForDate(date: Date): Observable<WorkoutWithPlan[]> {
    const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
    return this.workoutService.getWorkout().pipe(
      switchMap(workouts => {
        // Fetch the workoutPlan for each workout
        const workoutsWithPlans = workouts.map(workout => 
          this.workoutPlanService.getWorkoutPlanById(workout.workoutPlanID).pipe(
            map(workoutPlan => ({ ...workout, workoutPlan }))
          )
        );
        return forkJoin(workoutsWithPlans);
      }),
      map(workouts => workouts.filter(workout => {
        const workoutDate = moment(workout.date, 'DD.MM.YYYY').toDate();
        return this.datePipe.transform(workoutDate, 'dd.MM.yyyy') === formattedDate
  }))
    );
  }

  getWorkout(){
    this.workout$ = this.workoutService.getWorkout()
    };


    deleteWorkout(id: number){
      this.workoutService.delete(id).subscribe(() => {
        this.data = this.getDataForDate(this.selectedDate);
      });
    }
}


