import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyIntakeOverviewComponent} from './daily-intake-overview/daily-intake-overview.component';
import { DailyIntakeModule } from './daily-intake.module';
import { AddFoodComponent } from './add-food/add-food.component';

const routes: Routes = [
  { path:'', component: DailyIntakeOverviewComponent },
  { path: 'add', component: AddFoodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyIntakeRoutingModule { }
