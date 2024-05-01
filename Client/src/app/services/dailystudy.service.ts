import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyStudy } from '../models/dailyStudy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DailystudyService {

  constructor(private http: HttpClient) { }

  public getDailyStudy():Observable<DailyStudy[]>{
    return this.http.get<DailyStudy[]>("https://localhost:7004/api/DailyStudy");
  }

  

  public createDailyStudy(dailyStudy: DailyStudy):Observable<DailyStudy>{
    return this.http.post<DailyStudy>(`https://localhost:7004/api/DailyStudy`, dailyStudy); 
  }

  public removeCourseFromDailyStudy(dailyStudyId: number, courseId: number):Observable<DailyStudy>{
    return this.http.delete<DailyStudy>(`https://localhost:7004/api/DailyStudy/${dailyStudyId}/Course/${courseId}`);
  }
  
}
