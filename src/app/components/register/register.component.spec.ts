import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../DataModel/User';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', {
      register(user: User): Observable<any> {
        if (user.email === 'test@exists.com')
          return of(throwError('Registration failed'));
        return of('Token');
      },
    });
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        Router,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      email: '',
      password: '',
      name: '',
      surname: '',
      age: '',
    });
  });

  // it('should submit the form and navigate to home on successful registration', fakeAsync(() => {
  //
  //   component.form.patchValue({
  //     email: 'test@example.com',
  //     password: 'password',
  //     name: 'John',
  //     surname: 'Doe',
  //     age: 25
  //   });
  //
  //   component.submit();
  //   tick();
  //
  //   expect(component.form.valid).toBe(true);
  //   expect(localStorage.getItem('authToken')).toBe('mock-token');
  //   expect(router.navigate).toHaveBeenCalledWith(['/', 'home']);
  // }));
  //
  // it('should handle registration error', fakeAsync(() => {
  //   const errorResponse = { error: 'Registration failed' };
  //
  //   component.form.patchValue({
  //     email: 'test@exists.com',
  //     password: 'password',
  //     name: 'John',
  //     surname: 'Doe',
  //     age: 25
  //   });
  //
  //   component.submit();
  //   tick();
  //
  //   expect(component.form.valid).toBe(true);
  //
  //   expect(component.error).toBe('Registration failed');
  //   expect(router.navigate).not.toHaveBeenCalled();
  // }));

  it('should set error message for invalid form submission', () => {
    component.submit();

    expect(component.error).toBe('Invalid form');
    expect(authService.register).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
