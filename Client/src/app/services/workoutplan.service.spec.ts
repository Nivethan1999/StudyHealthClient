import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorkoutplanService } from './workoutplan.service';
import { WorkoutPlan } from '../models/workoutplan';

describe('WorkoutplanService', () => {
  let service: WorkoutplanService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorkoutplanService]
    });

    service = TestBed.inject(WorkoutplanService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should create a workout plan', () => {
    const dummyWorkoutPlan: WorkoutPlan = { workoutPlanID: 1, workoutName: 'Fodbold ', exerciseIDs: [1, 2, 3] };

    service.createWorkoutPlan(dummyWorkoutPlan).subscribe(workoutPlan => {
      expect(workoutPlan).toEqual(dummyWorkoutPlan);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/WorkoutPlan/');
    expect(req.request.method).toBe('POST');
    req.flush(dummyWorkoutPlan);
  });

  it('should fetch workout plans', () => {
    const dummyWorkoutPlans: WorkoutPlan[] = [
      { workoutPlanID: 1, workoutName: 'Fodbold ', exerciseIDs: [1, 2, 3] },
      { workoutPlanID: 2, workoutName: 'Swimming ', exerciseIDs: [1] }
    ];

    service.getWorkoutPlan().subscribe(workoutPlans => {
      expect(workoutPlans.length).toBe(2);
      expect(workoutPlans).toEqual(dummyWorkoutPlans);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/WorkoutPlan/');
    expect(req.request.method).toBe('GET');
    req.flush(dummyWorkoutPlans);
  });

  it('should fetch a workout plan by id', () => {
    const dummyWorkoutPlan: WorkoutPlan = { workoutPlanID: 1, workoutName: 'Fodbold ', exerciseIDs: [1, 2, 3] };

    service.getWorkoutPlanById(1).subscribe(workoutPlan => {
      expect(workoutPlan).toEqual(dummyWorkoutPlan);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/WorkoutPlan/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyWorkoutPlan);
  });

  it('should add an exercise to a workout plan', () => {
    const dummyWorkoutPlan: WorkoutPlan = { workoutPlanID: 1, workoutName: 'Fodbold ', exerciseIDs: [1, 2, 3] }

    service.addExerciseToWorkoutPlan(1, [1]).subscribe(workoutPlan => {
      expect(workoutPlan).toEqual(dummyWorkoutPlan);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/WorkoutPlan/1/Exercises`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyWorkoutPlan);
  });

  it('should remove an exercise from a workout plan', () => {
    const dummyWorkoutPlan: WorkoutPlan = { workoutPlanID: 1, workoutName: 'Fodbold ', exerciseIDs: [1, 2, 3] }

    service.removeExerciseFromWorkoutPlan(1, 1).subscribe(workoutPlan => {
      expect(workoutPlan).toEqual(dummyWorkoutPlan);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/WorkoutPlan/1/Exercise/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyWorkoutPlan);
  });
});