import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { WorkoutPlan } from '../models/workoutplan';

@Injectable({
  providedIn: 'root'
})
export class WorkoutplanService {

  constructor(private http: HttpClient) { }

  public createWorkoutPlan(workoutPlan: WorkoutPlan):Observable<WorkoutPlan>{
    return this.http.post<WorkoutPlan>(`https://localhost:7004/api/WorkoutPlan/`, workoutPlan); 
  }

  public getWorkoutPlan():Observable<WorkoutPlan[]>{
    return this.http.get<WorkoutPlan[]>(`https://localhost:7004/api/WorkoutPlan/`);
  }

  public getWorkoutPlanById(id: number):Observable<WorkoutPlan>{
    return this.http.get<WorkoutPlan>(`https://localhost:7004/api/WorkoutPlan/${id}`);
  }

  public addExerciseToWorkoutPlan(workoutPlanId: number, exerciseIds: number[]):Observable<WorkoutPlan>{
    return this.http.post<WorkoutPlan>(`https://localhost:7004/api/WorkoutPlan/${workoutPlanId}/Exercises`, exerciseIds);
  }

  public removeExerciseFromWorkoutPlan(workoutPlanId: number, exerciseId: number):Observable<WorkoutPlan>{
    return this.http.delete<WorkoutPlan>(`https://localhost:7004/api/WorkoutPlan/${workoutPlanId}/Exercise/${exerciseId}`);
  }

}
