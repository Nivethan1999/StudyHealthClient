import { Component } from '@angular/core';
import { Food } from '../../models/food';
import { Observable } from 'rxjs';
import { DailyIntake, MealType } from '../../models/dailyIntake';
import { FormGroup, MaxValidator, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DailyIntakeService } from '../../services/daily-intake.service';


@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css',
  providers: [DatePipe]
})
export class AddFoodComponent {

  Food$!: Observable<Food[]>;
  DailyIntake$!: Observable<DailyIntake[]>;
  DailyIntakeForm!: FormGroup;
  FoodForm!: FormGroup;
  formattedDate: string = '';
  mealTypes = Object.values(MealType);
  

  constructor(private Foodervice: FoodService,
     private fb: FormBuilder,
     private router: Router,
     private dailyIntakeService: DailyIntakeService,
     private datePipe: DatePipe) { }

  
  ngOnInit(): void {
    this.fetchFood();
    this.fetchDailyIntake();
    this.DailyIntakeForm = this.fb.group({
      'Date': ['', [Validators.required]],
      'Meals': ['', Validators.required],
      'Gram': [null, Validators.required],
      'Calories': [null, Validators.required],
      'CaloriesEaten': [null, [Validators.min(0), Validators.max(2)]],

      'FoodIDs': [null, Validators.required],
    });
    this.FoodForm = this.fb.group({
      'Name': ['', [Validators.required]],
      'Calories': [null , [Validators.required]],
    });
    
}



fetchFood() {
  this.Food$ = this.Foodervice.getFood();
}

fetchDailyIntake() {
  this.DailyIntake$ = this.dailyIntakeService.getDailyIntake();
}



registerDailyIntake() {
  if (this.DailyIntakeForm.valid) {
    let dailyStudyData = this.DailyIntakeForm.value;

    this.formattedDate = this.datePipe.transform(
      dailyStudyData.Date,
      'dd.MM.yyyy'
    )!;

    dailyStudyData.Date = this.formattedDate;

    dailyStudyData.FoodIDs = [dailyStudyData.FoodIDs];

    this.dailyIntakeService.createDailyIntake(dailyStudyData).subscribe(() => {
      this.router.navigate(['/dailyintake']);
    });
  }
}


registerFood() {
  if (this.FoodForm.valid) {
    this.Foodervice.createFood(this.FoodForm.value).subscribe(() => {
      this.fetchFood();
    });
  }
}

}
