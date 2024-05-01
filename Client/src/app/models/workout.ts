import { WorkoutPlan } from "./workoutplan";

export interface Workout {
    workoutID: number
    date: Date
    duration: number
    workoutPlanID: number
  }

 export interface WorkoutWithPlan extends Workout {
    workoutPlan: WorkoutPlan;
  }