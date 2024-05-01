import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import { Exercise } from '../../models/exercise';
import { WorkoutplanService } from '../../services/workoutplan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workoutplan',
  templateUrl: './addworkoutplan.component.html',
  styleUrls: ['./addworkoutplan.component.css']
})
export class AddWorkoutplanComponent implements OnInit {

  Exercises$!: Observable<Exercise[]>;
  WorkoutPlanForm!: FormGroup;
  searchControl = new FormControl();
  filteredExercises$!: Observable<Exercise[]>;

  constructor(
    private exerciseService: ExerciseService,
    private fb: FormBuilder,
    private workoutplanService: WorkoutplanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchExercises();
    this.WorkoutPlanForm = this.fb.group({
      'WorkoutName': ['', [Validators.required]],
      'ExerciseIDs': [null],
    });

    this.setupFiltering();
  }

  fetchExercises() {
    this.Exercises$ = this.exerciseService.getExercise();
  }

  setupFiltering() { 
    this.filteredExercises$ = combineLatest([
      this.Exercises$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([exercises, searchValue]) =>
        exercises.filter(exercise =>
          exercise.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    );
  }

  onRegisterData() {
    if (this.WorkoutPlanForm.valid) {
      this.workoutplanService.createWorkoutPlan(this.WorkoutPlanForm.value).subscribe(() => {
        this.router.navigate(['/workoutplan']);
      });
    }
  }
}
