import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../models/workout';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutService]
    });

    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should fetch workouts', () => {
    const dummyWorkouts: Workout[] = [
      { workoutID: 1, date: new Date, duration: 10, workoutPlanID: 1 },
      { workoutID: 2, date: new Date, duration: 60, workoutPlanID: 3 }
    ];

    service.getWorkout().subscribe(workouts => {
      expect(workouts.length).toBe(2);
      expect(workouts).toEqual(dummyWorkouts);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Workout');
    expect(req.request.method).toBe('GET');
    req.flush(dummyWorkouts);
  });

  it('should add a workout', () => {
    const dummyWorkout: Workout = { workoutID: 1, date: new Date, duration: 10, workoutPlanID: 1 };

    service.addWorkout(dummyWorkout).subscribe(workout => {
      expect(workout).toEqual(dummyWorkout);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Workout');
    expect(req.request.method).toBe('POST');
    req.flush(dummyWorkout);
  });

  it('should delete a workout', () => {
    service.delete(1).subscribe(res => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/Workout/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});