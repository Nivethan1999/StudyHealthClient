import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DailystudyService } from './dailystudy.service';
import { DailyStudy } from '../models/dailyStudy';

describe('DailystudyService', () => {
  let service: DailystudyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DailystudyService]
    });

    service = TestBed.inject(DailystudyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should fetch daily studies', () => {
    const dummyDailyStudies: DailyStudy[] = [
      { dailyStudyID: 1, date: new Date(), duration: 100, courseIDs: [1,2,3] },
      { dailyStudyID: 2, date: new Date(), duration: 25, courseIDs: [1] }
    ];

    service.getDailyStudy().subscribe(dailyStudies => {
      expect(dailyStudies.length).toBe(2);
      expect(dailyStudies).toEqual(dummyDailyStudies);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/DailyStudy');
    expect(req.request.method).toBe('GET');
    req.flush(dummyDailyStudies);
  });

  it('should create a daily study', () => {
    const dummyDailyStudy: DailyStudy = { dailyStudyID: 1, date: new Date(), duration: 1, courseIDs: [1] };

    service.createDailyStudy(dummyDailyStudy).subscribe(dailyStudy => {
      expect(dailyStudy).toEqual(dummyDailyStudy);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/DailyStudy');
    expect(req.request.method).toBe('POST');
    req.flush(dummyDailyStudy);
  });

  it('should remove a course from a daily study', () => {
    const dummyDailyStudy: DailyStudy = { dailyStudyID: 1, date: new Date(), duration: 1, courseIDs: [1] };

    service.removeCourseFromDailyStudy(1, 1).subscribe(dailyStudy => {
      expect(dailyStudy).toEqual(dummyDailyStudy);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/DailyStudy/1/Course/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyDailyStudy);
  });
});