import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { AddCourseComponent } from './add-course/add-course.component';

const routes: Routes = [
  {path: '', component: CourseOverviewComponent},
  {path: 'add', component: AddCourseComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
