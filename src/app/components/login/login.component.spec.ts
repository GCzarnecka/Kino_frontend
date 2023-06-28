import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import {MatCard} from "@angular/material/card";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpTestingController} from "@angular/common/http/testing";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;


  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', {
        login: () => of('mock_token'),
      });
      const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [
          { provide: AuthService, useValue: authServiceSpy },
          { provide: Router, useValue: routerSpy }
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    })

  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const store: any = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
      return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form instanceof FormGroup).toBeTrue();
    expect(component.form.controls['username'] instanceof FormControl).toBeTrue();
    expect(component.form.controls['password'] instanceof FormControl).toBeTrue();
  });

  it('should submit the form and login on valid form submission', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const token = 'mock_token';
    const loginResponse = { token };

    component.form.controls['username'].setValue(username);
    component.form.controls['password'].setValue(password);

    authService.login.and.returnValue(of(loginResponse));

    component.submit();

    expect(authService.login).toHaveBeenCalledWith(username, password);
    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', token);
    expect(localStorage.getItem('authToken')).toBe(token);
  });

});
