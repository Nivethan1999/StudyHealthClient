import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Workout } from '../../models/workout';
import { Observable } from 'rxjs';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { WorkoutPlan } from '../../models/workoutplan';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css',
  providers: [DatePipe],
})
export class AddWorkoutComponent {

  WorkoutPlans$!: Observable<WorkoutPlan[]>;
  WorkoutForm!: FormGroup;
  formattedDate: string = '';


  constructor(private workoutService: WorkoutService,
     private fb: FormBuilder,
     private workoutPlanService: WorkoutplanService,
     private router: Router,
    private datePipe: DatePipe) { }

  
  ngOnInit(): void {
    this.fetchWorkoutPlan();
    this.WorkoutForm = this.fb.group({
      'Date': ['', [Validators.required]],
      'Duration': [null, [Validators.required]],
      'WorkoutPlanID': [null, [Validators.required]], 
    });
}

fetchWorkoutPlan() {
  this.WorkoutPlans$ = this.workoutPlanService.getWorkoutPlan();
}

registerWorkout() {
  if (this.WorkoutForm.valid) {
    let workout = this.WorkoutForm.value;

    this.formattedDate = this.datePipe.transform(
      workout.Date,
      'dd.MM.yyyy'
    )!;
    workout.Date = this.formattedDate;
    workout.WorkoutPlanID = workout.WorkoutPlanID;

    this.workoutService.addWorkout(this.WorkoutForm.value).subscribe(() => {
      this.router.navigate(['/workout']);
    });
  }


}
}
