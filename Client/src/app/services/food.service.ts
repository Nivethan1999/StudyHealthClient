import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  public getFood():Observable<Food[]>{
    return this.http.get<Food[]>("https://localhost:7004/api/Food");
  }

  public createFood(food: Food):Observable<Food>{
    return this.http.post<Food>(`https://localhost:7004/api/Food`, food); 
  }

  public getFoodById(foodId: number):Observable<Food>{
    return this.http.get<Food>(`https://localhost:7004/api/Food/${foodId}`); 

}
}
