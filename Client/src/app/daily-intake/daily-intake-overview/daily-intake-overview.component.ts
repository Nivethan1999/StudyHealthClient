import { Component, SimpleChanges } from '@angular/core';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { DailyIntake, DailyIntakeWithFoods, MealType } from '../../models/dailyIntake';
import { ActivatedRoute } from '@angular/router';
import { DailyIntakeService } from '../../services/daily-intake.service';
import moment from 'moment';

@Component({
  selector: 'app-food',
  templateUrl: './daily-intake-overview.component.html',
  styleUrl: './daily-intake-overview.component.css',
  providers: [DatePipe]
})
export class DailyIntakeOverviewComponent {

Foods$!: Observable<Food[]>
selectedDate!: Date;
data$!: Observable<DailyIntakeWithFoods[]>;
dailyIntake$!: Observable<DailyIntake[]>;
selectedDailyIntakeId: number = 0;
groupedIntakes$: Observable<{ [key: string]: DailyIntakeWithFoods[] }> = new Observable<{ [key: string]: DailyIntakeWithFoods[] }>();
mealTypes = Object.values(MealType);
  constructor(private foodService: FoodService,
    private route: ActivatedRoute,
    private dailyIntakeService: DailyIntakeService,
    private datePipe: DatePipe
    ) { this.selectedDate = new Date(); // Set selectedDate to the current date
  }

  ngOnInit() {
    this.getDailyIntake();
    this.data$ = this.getDataForDate(this.selectedDate); // Fetch data for the current date
    this.groupIntakesByMealType();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && !changes['selectedDate'].firstChange) {
      this.data$ = this.getDataForDate(this.selectedDate);
      this.groupIntakesByMealType();
    }
  }
  
  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.data$ = this.getDataForDate(this.selectedDate);
    this.groupIntakesByMealType();
  }

  getFood(){
    this.Foods$ = this.foodService.getFood()
    };

    getDailyIntake(){
      this.dailyIntake$ = this.dailyIntakeService.getDailyIntake()
    }

    groupIntakesByMealType(): void {
      this.groupedIntakes$ = this.data$.pipe(
        map((dailyIntakes) =>
          dailyIntakes.reduce((groups, intake) => {
            const key = intake.meals;
            groups[key] = groups[key] || [];
            groups[key].push(intake);
            return groups;
          }, {} as { [key: string]: DailyIntakeWithFoods[] })
        )
      );
    }

    getDataForDate(date: Date): Observable<DailyIntakeWithFoods[]> {
      console.log('date:', date); // Add this line
      const formattedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
      return this.dailyIntakeService.getDailyIntake().pipe(
        switchMap(dailyIntakes => {
          // Fetch the course for each dailyStudy
          const dailyIntakesWithFoods = dailyIntakes.flatMap(dailyIntake => 
            dailyIntake.foodIDs.map(FoodID => 
              this.foodService.getFoodById(FoodID).pipe(
                map(food => ({ ...dailyIntake, food }))
              )
            )
          );
          return forkJoin(dailyIntakesWithFoods);
        }),
        map(dailyIntakes => dailyIntakes.filter(dailyIntake => {
          const dailyStudyDate = moment(dailyIntake.date, 'DD.MM.YYYY').toDate();
          console.log('dailyStudy.date:', dailyStudyDate);
          return this.datePipe.transform(dailyStudyDate, 'dd.MM.yyyy') === formattedDate
        }))
      );
    }

    removeFoodFromDailyIntake(dailyIntakeId: number, foodId: number) {
      this.dailyIntakeService.removeFoodFromDailyIntake(dailyIntakeId, foodId).subscribe(
        (x) => {
          this.getDailyIntake();
          this.data$ = this.getDataForDate(this.selectedDate);
        },
      );
    }
  }

