import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../models/exercise';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExerciseService]
    });

    service = TestBed.inject(ExerciseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should fetch exercises', () => {
    const dummyExercises: Exercise[] = [
      { exerciseID: 1, name: 'Biceps', type: 'WeightLifting', iterations: 12, videoURL: 'https://www.youtube.com/watch?v=dQw4w', workoutPlanIDs: [1, 2] },
      { exerciseID: 1, name: 'Running', type: 'Cardio', iterations: 5, videoURL: 'https://www.youtube.com/watcewfh?v=dQw4w', workoutPlanIDs: [1, 2,3,4] }
    ];

    service.getExercise().subscribe(exercises => {
      expect(exercises.length).toBe(2);
      expect(exercises).toEqual(dummyExercises);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Exercise');
    expect(req.request.method).toBe('GET');
    req.flush(dummyExercises);
  });

  it('should create an exercise', () => {
    const dummyExercise: Exercise =  { exerciseID: 1, name: 'Biceps', type: 'WeightLifting', iterations: 12, videoURL: 'https://www.youtube.com/watch?v=dQw4w', workoutPlanIDs: [1, 2] };

    service.createExercise(dummyExercise).subscribe(exercise => {
      expect(exercise).toEqual(dummyExercise);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Exercise');
    expect(req.request.method).toBe('POST');
    req.flush(dummyExercise);
  });

  it('should fetch an exercise by id', () => {
    const dummyExercise: Exercise =  { exerciseID: 1, name: 'Biceps', type: 'WeightLifting', iterations: 12, videoURL: 'https://www.youtube.com/watch?v=dQw4w', workoutPlanIDs: [1, 2] };

    service.getExerciseById(1).subscribe(exercise => {
      expect(exercise).toEqual(dummyExercise);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/Exercise/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyExercise);
  });
});