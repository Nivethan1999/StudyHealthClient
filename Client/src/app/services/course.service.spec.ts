import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Make sure that there are no outstanding requests
  });

  it('should fetch courses', () => {
    const dummyCourses: Course[] = [
      { courseID: 1, name: 'Course 1', ects: 1, dailyStudyID: [1] },
      { courseID: 2, name: 'Course 2', ects: 2, dailyStudyID: [2] },
    ];

    service.getCourse().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(dummyCourses);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Course');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourses);
  });

  it('should add a course', () => {
    const dummyCourse: Course = { courseID: 1, name: 'Course 1', ects: 5, dailyStudyID: [1]};

    service.addCourse(dummyCourse).subscribe(course => {
      expect(course).toEqual(dummyCourse);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Course');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCourse);
  });

  it('should fetch a course by id', () => {
    const dummyCourse: Course = { courseID: 1, name: 'Course 1', ects: 10, dailyStudyID: [1,2] };

    service.getCourseById(1).subscribe(course => {
      expect(course).toEqual(dummyCourse);
    });

    const req = httpMock.expectOne(`https://localhost:7004/api/Course/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCourse);
  });
});