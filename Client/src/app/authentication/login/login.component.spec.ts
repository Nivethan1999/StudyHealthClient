import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of('testToken'))
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ],
      imports: [ ReactiveFormsModule, FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatOptionModule ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize LoginForm', () => {
    component.ngOnInit();
    expect(component.LoginForm).toBeDefined();
    expect(component.LoginForm.get('Username')).toBeDefined();
    expect(component.LoginForm.get('Password')).toBeDefined();
  });

  it('should call AuthService.login and navigate to dashboard on successful login', () => {
    const loginFormValue = { 
      Username: 'test', 
      Password: 'test',
     
      
    };
    component.ngOnInit();
    component.LoginForm.setValue(loginFormValue);
    component.Login();
    expect(authService.login).toHaveBeenCalledWith(loginFormValue);
    expect(localStorage.getItem('authToken')).toBe('testToken');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

});