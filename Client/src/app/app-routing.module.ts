import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './AuthGuard';


// const routes: Routes = [
//   // { path:'', component: AuthComponent },
//   {path: "", loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
//   {path: 'dailyintake', loadChildren:() => import('./daily-intake/daily-intake.module').then(m => m.DailyIntakeModule)},
//   {path: 'workoutplan', loadChildren:() => import('./workoutplan/workoutplan.module').then(m => m.WorkoutPlanModule)},
//   {path: 'workout', loadChildren:() => import('./workout/workout.module').then(m => m.WorkoutModule)},
//   {path: 'course', loadChildren:() => import('./course/course.module').then(m => m.CourseModule)},
//   {path: 'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)},
// ];

const routes: Routes = [
  {path: "", loadChildren:() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'dailyintake', loadChildren:() => import('./daily-intake/daily-intake.module').then(m => m.DailyIntakeModule), canActivate: [AuthGuard]},
  {path: 'workoutplan', loadChildren:() => import('./workoutplan/workoutplan.module').then(m => m.WorkoutPlanModule), canActivate: [AuthGuard]},
  {path: 'workout', loadChildren:() => import('./workout/workout.module').then(m => m.WorkoutModule), canActivate: [AuthGuard]},
  {path: 'course', loadChildren:() => import('./course/course.module').then(m => m.CourseModule), canActivate: [AuthGuard]},
  {path: 'dashboard', loadComponent:() => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
