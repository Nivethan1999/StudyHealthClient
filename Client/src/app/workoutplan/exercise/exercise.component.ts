import { Component } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../../models/exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {

  constructor(private exerciseService: ExerciseService, private fb: FormBuilder) { }

  ExerciseForm!: FormGroup;

  Exercise$!: Observable<Exercise[]>
  


  ngOnInit(): void {
    this.ExerciseForm = this.fb.group({
      'Name': new FormControl("", [Validators.required]),
      'Type': new FormControl("", [Validators.required]),
      'Iterations': new FormControl("", [Validators.required]),
      'VideoURL': new FormControl(''),
    });
  }

  onCreateExercise(){ 
    this.exerciseService.createExercise(this.ExerciseForm.value).subscribe();
  }

  fetchExercise(){
    this.Exercise$ = this.exerciseService.getExercise();
  }

}
