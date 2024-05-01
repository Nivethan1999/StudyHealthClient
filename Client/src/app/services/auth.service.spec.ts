import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Account, accountLogin } from '../models/account';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new account', () => {
    const dummyAccount: Account = {
      Username: 'Test',
      Password: 'Tester',
      Email: 'test@example.com',
      Weight: 80,
      Height: 180
    };

    service.register(dummyAccount).subscribe(res => {
      expect(res).toEqual(dummyAccount);
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(dummyAccount);
  });

  it('should log in an account', () => {
    const dummyLogin: accountLogin = {
      Username: 'test',
      Password: 'tester'
      // Fill with dummy login data
    };

    service.login(dummyLogin).subscribe(token => {
      expect(token).toBeTruthy();
      expect(service.isLoggedInCurrentValue()).toBeTrue();
    });

    const req = httpMock.expectOne('https://localhost:7004/api/Auth/login');
    expect(req.request.method).toBe('POST');
    req.flush('dummyToken');
  });


  it('should return the current value of loggedIn as an Observable', (done) => {
    service.isLoggedIn.subscribe(value => {
      expect(value).toBeFalse(); // Assuming no token exists at the start
      done();
    });
  });

});