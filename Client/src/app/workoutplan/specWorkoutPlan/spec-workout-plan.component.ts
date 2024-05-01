import { Component } from '@angular/core';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { WorkoutPlan } from '../../models/workoutplan';
import { Exercise } from '../../models/exercise';
import { map, switchMap } from 'rxjs/operators';
import { ExerciseService } from '../../services/exercise.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-baba',
  templateUrl: './spec-workout-plan.component.html',
  styleUrl: './spec-workout-plan.component.css',
})
export class specWorkoutPlanComponent {
  specWorkoutPlan$!: Observable<Exercise[]>;
  workoutPlan$!: Observable<WorkoutPlan[]>;
  workoutPlan!: WorkoutPlan;
  selectedWorkoutPlanId: number = 0; // Initialize selectedWorkoutPlanId property
  showSelect: boolean = false;
  Exercises$!: Observable<Exercise[]>;
  Exercise!: FormGroup;
  displayedColumns: string[] = ['name', 'type', 'iterations', 'remove'];

  constructor(
    private workoutPlanService: WorkoutplanService,
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.Exercise = this.fb.group({
      ExerciseIDs: new FormControl(null),
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.selectedWorkoutPlanId = +id; // Set selectedWorkoutPlanId here
      this.FetchWorkoutPlans(this.selectedWorkoutPlanId).subscribe(exercises => {
        this.specWorkoutPlan$ = of(exercises);
      });
    }
  }

  FetchWorkoutPlans(id: number): Observable<Exercise[]> {
    this.Exercises$ = this.exerciseService.getExercise();
    return this.workoutPlanService.getWorkoutPlanById(id).pipe(
      switchMap((workoutPlan) => {
        // workoutPlan contains an array of exercise IDs
        const exerciseObservables = workoutPlan.exerciseIDs.map((exerciseId) =>
          this.exerciseService.getExerciseById(exerciseId)
        );
  
        // Use forkJoin to combine multiple observables into one
        return exerciseObservables.length > 0 ? forkJoin(exerciseObservables) : of([]);
      })
    );
  }


  selectWorkoutPlan(workoutPlanId: number) {
    this.selectedWorkoutPlanId = workoutPlanId;
  }

  removeExerciseFromSelectedWorkoutPlan(exerciseId: number) {
    if (this.selectedWorkoutPlanId) {
      this.workoutPlanService
        .removeExerciseFromWorkoutPlan(this.selectedWorkoutPlanId, exerciseId)
        .pipe(
          switchMap(() => this.FetchWorkoutPlans(this.selectedWorkoutPlanId))
        )
        .subscribe((exercises) => {
          this.specWorkoutPlan$ = of(exercises);
        });
    } else {
      console.error('No workout plan selected');
    }
  }
  
  addExerciseToSelectedWorkoutPlan(){ 
    if (this.selectedWorkoutPlanId) { 
      this.workoutPlanService
        .addExerciseToWorkoutPlan(
          this.selectedWorkoutPlanId,
          this.Exercise.value
        )
        .subscribe((workoutPlan) => {
          if (workoutPlan) {
            this.workoutPlan = workoutPlan;
            this.FetchWorkoutPlans(workoutPlan.workoutPlanID).subscribe(exercises => {
              this.specWorkoutPlan$ = of(exercises);
            });
          }
        });
    } else {
      console.error('No workout plan selected');
    }
  }

  toggleSelect() {
    this.showSelect = !this.showSelect;
  }
}
