import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyIntake } from '../models/dailyIntake';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailyIntakeService {

  constructor(private http: HttpClient) { }

  public getDailyIntake():Observable<DailyIntake[]>{
    return this.http.get<DailyIntake[]>("https://localhost:7004/api/DailyIntake");
  }

  public createDailyIntake(dailyIntake: DailyIntake):Observable<DailyIntake>{
    return this.http.post<DailyIntake>(`https://localhost:7004/api/DailyIntake`, dailyIntake); 
  }

  public removeFoodFromDailyIntake(dailyIntakeId: number, foodId: number):Observable<DailyIntake>{
    return this.http.delete<DailyIntake>(`https://localhost:7004/api/DailyIntake/${dailyIntakeId}/Food/${foodId}`);
  }

}
