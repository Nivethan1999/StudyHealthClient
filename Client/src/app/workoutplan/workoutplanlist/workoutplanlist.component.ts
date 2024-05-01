import { Component } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { FormBuilder } from '@angular/forms';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { WorkoutPlan } from '../../models/workoutplan';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-workoutplanlist',
  templateUrl: './workoutplanlist.component.html',
  styleUrl: './workoutplanlist.component.css',
})
export class WorkoutplanlistComponent {
  WorkoutPlans$!: Observable<WorkoutPlan[]>;
  displayedColumns: string[] = ['workoutName', 'exercises'];

  constructor(
    private fb: FormBuilder,
    private workoutplanService: WorkoutplanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchWorkoutPlans();
    
  }

  fetchWorkoutPlans() {
    this.WorkoutPlans$ = this.workoutplanService.getWorkoutPlan();
    this.WorkoutPlans$.subscribe((data) => {
      console.log(data); // Log the fetched data
    });
  }
  redirectToAddWorkoutPlan() {
    this.router.navigate(['/workoutplan/add']);
  }
}
