import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceMock = {
      register: jasmine.createSpy('register').and.returnValue(of())
    };

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
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

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize RegisterForm', () => {
    component.ngOnInit();
    expect(component.RegisterForm).toBeDefined();
    expect(component.RegisterForm.get('Username')).toBeDefined();
    expect(component.RegisterForm.get('Email')).toBeDefined();
    expect(component.RegisterForm.get('Password')).toBeDefined();
    expect(component.RegisterForm.get('Weight')).toBeDefined();
    expect(component.RegisterForm.get('Height')).toBeDefined();
  });

  it('should call AuthService.register when onRegisterData is called', () => {
    const registerFormValue = { 
      Username: 'test', 
      Password: 'test',
      Email: 'test@test.com',
      Weight: 70,
      Height: 170
    };
    component.ngOnInit();
    component.RegisterForm.setValue(registerFormValue);
    component.onRegisterData();
    expect(authService.register).toHaveBeenCalledWith(registerFormValue);
  });
});