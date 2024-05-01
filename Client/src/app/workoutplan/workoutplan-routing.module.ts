import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWorkoutplanComponent } from './addworkoutplan/addworkoutplan.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { WorkoutplanlistComponent } from './workoutplanlist/workoutplanlist.component';
import {specWorkoutPlanComponent} from "./specWorkoutPlan/spec-workout-plan.component";

const routes: Routes = [
  { path: '', component: WorkoutplanlistComponent },
  { path: 'exercise', component: ExerciseComponent},
  { path: 'add', component: AddWorkoutplanComponent},
  { path: ':id', component: specWorkoutPlanComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutPlanRoutingModule { }
