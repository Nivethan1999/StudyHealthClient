import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FoodService } from './food.service';
import { Food } from '../models/food';

describe('FoodService', () => {
  let service: FoodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodService]
    });

    service = TestBed.inject(FoodService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should fetch food', () => {
    const dummyFood: Food[] = [
      { foodID: 1, name: 'Banana', calories: 200, dailyIntakeID: [1, 2] },
      { foodID: 2, name: 'Kebab', calories: 1000, dailyIntakeID: [1] }
    ];

    service.getFood().subscribe(food => {
      expect(food.length).toBe(2);
      expect(food).toEqual(dummyFood);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Food');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFood);
  });

  it('should create a food', () => {
    const dummyFood: Food =  { foodID: 1, name: 'Banana', calories: 200, dailyIntakeID: [1, 2] };

    service.createFood(dummyFood).subscribe(food => {
      expect(food).toEqual(dummyFood);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Food');
    expect(req.request.method).toBe('POST');
    req.flush(dummyFood);
  });

  it('should fetch a food by id', () => {
    const dummyFood: Food =  { foodID: 1, name: 'Banana', calories: 200, dailyIntakeID: [1, 2] };

    service.getFoodById(1).subscribe(food => {
      expect(food).toEqual(dummyFood);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/Food/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFood);
  });
});