import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoggedControllsComponent } from './logged-controlls.component';
import { UserService } from '../../services/user.service';
import { User } from '../../DataModel/User';
import {Router} from '@angular/router';
import { of } from 'rxjs';
import {RouterTestingModule} from "@angular/router/testing";

describe('LoggedControllsComponent', () => {
  let component: LoggedControllsComponent;
  let fixture: ComponentFixture<LoggedControllsComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
    role: 'user',
    reservations: [],
    complaints: [],
    age: 20,
    surname: 'Doe',
  };

  beforeEach(
    waitForAsync(() => {
      const userServiceSpy = jasmine.createSpyObj('UserService', {
        getUser: of(user),
      });

      TestBed.configureTestingModule({
        declarations: [LoggedControllsComponent],
        providers: [
          { provide: UserService, useValue: userServiceSpy }
        ],
        imports: [RouterTestingModule.withRoutes([
          {path: 'home', component: LoggedControllsComponent}
        ])],
      }).compileComponents();

      userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

      spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {});
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the user name on initialization', () => {
    userService.getUser.and.returnValue(of(user));

    component.ngOnInit();

    expect(component.name).toEqual(user.name);
  });

  it('should remove the auth token on logout', () => {
    component.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
  });

});
