import { Food } from "./food";

export interface DailyIntake {
    dailyIntakeID: number
    date: Date
    meals: string
    gram: number
    calories: number
    caloriesEaten: number
    foodIDs: number[]
  }

  export interface DailyIntakeWithFoods extends DailyIntake { 
    food: Food;
  }

  export enum MealType {
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Snacks = 'Snacks'
  }