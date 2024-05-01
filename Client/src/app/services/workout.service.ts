import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getWorkout(): Observable<Workout[]> {
    return this.http.get<Workout[]>('https://localhost:7004/api/Workout');
  }

  addWorkout(workout: Workout) {
    return this.http.post('https://localhost:7004/api/Workout', workout);
  }

  delete (id: number){
    return this.http.delete(`https://localhost:7004/api/Workout/${id}`);
  }


}
