import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutOverviewComponent } from './workout-overview/workout-overview.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';

const routes: Routes = [
    {path: '', component: WorkoutOverviewComponent},
    {path: 'add-workout', component: AddWorkoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }
