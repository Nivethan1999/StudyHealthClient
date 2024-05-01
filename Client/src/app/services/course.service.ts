import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourse(): Observable<Course[]> {
    return this.http.get<Course[]>('https://localhost:7004/api/Course');
  }

  addCourse(Course: Course) {
    return this.http.post('https://localhost:7004/api/Course', Course);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`https://localhost:7004/api/Course/${id}`);
  }
  
}
