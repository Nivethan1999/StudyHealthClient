import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }



  public getExercise():Observable<Exercise[]>{
    return this.http.get<Exercise[]>("https://localhost:7004/api/Exercise");
  }

  public createExercise(exercise: Exercise):Observable<Exercise>{
    return this.http.post<Exercise>("https://localhost:7004/api/Exercise", exercise);
  }


  public getExerciseById(id: number):Observable<Exercise>{
    return this.http.get<Exercise>(`https://localhost:7004/api/Exercise/${id}`);
  }



}
