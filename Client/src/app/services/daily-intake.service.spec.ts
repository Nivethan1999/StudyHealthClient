import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DailyIntakeService } from './daily-intake.service';
import { DailyIntake } from '../models/dailyIntake';

describe('DailyIntakeService', () => {
  let service: DailyIntakeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DailyIntakeService]
    });

    service = TestBed.inject(DailyIntakeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should fetch daily intakes', () => {
    const dummyDailyIntakes: DailyIntake[] = [
      { dailyIntakeID: 1, date: new Date() , meals: 'Breakfast', gram: 100, calories: 100, caloriesEaten: 400, foodIDs: [1] },
      { dailyIntakeID: 2, date: new Date() , meals: 'Breakfast', gram: 100, calories: 100, caloriesEaten: 400, foodIDs: [1] },
    ];

    service.getDailyIntake().subscribe(dailyIntakes => {
      expect(dailyIntakes.length).toBe(2);
      expect(dailyIntakes).toEqual(dummyDailyIntakes);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/DailyIntake');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDailyIntakes);
  });

  it('should create a daily intake', () => {
    const dummyDailyIntake: DailyIntake = { dailyIntakeID: 2, date: new Date() , meals: 'Breakfast', gram: 100, calories: 100, caloriesEaten: 400, foodIDs: [1] };

    service.createDailyIntake(dummyDailyIntake).subscribe(dailyIntake => {
      expect(dailyIntake).toEqual(dummyDailyIntake);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/DailyIntake');
    expect(req.request.method).toBe('POST');
    req.flush(dummyDailyIntake);
  });

  it('should remove a food from a daily intake', () => {
    const dummyDailyIntake: DailyIntake = { dailyIntakeID: 2, date: new Date() , meals: 'Breakfast', gram: 100, calories: 100, caloriesEaten: 400, foodIDs: [1] };

    service.removeFoodFromDailyIntake(1, 1).subscribe(dailyIntake => {
      expect(dailyIntake).toEqual(dummyDailyIntake);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/DailyIntake/1/Food/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyDailyIntake);
  });
});