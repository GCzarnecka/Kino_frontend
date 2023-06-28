import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogReservationComponent } from '../dialog-reservation/dialog-reservation.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let userService: UserService;
  let dialog: MatDialog;

  beforeEach(async () => {
    dialog = jasmine.createSpyObj('MatDialog', {
      open: {
        afterClosed: () => of(true)
      }
    })
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [{
        provide: UserService,
        useValue: {
          getUser: jasmine.createSpy('getUser').and.returnValue(of({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            role: 'ADMIN',
            reservations: [],
            complaints: [],
            age: 20,
            surname: 'Doe',
          }))
        }
      },
        { provide: MatDialog, useValue: dialog },],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with token and isAdmin properties', () => {
    spyOn(component, 'getToken').and.returnValue('mock-token');

    fixture.detectChanges();

    expect(component.token).toBe('mock-token');
    expect(component.isAdmin).toBe(true);
    expect(component.getToken).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalled();
  });

  it('should update token property during ngDoCheck', () => {
    spyOn(component, 'getToken').and.returnValue('updated-token');

    component.ngDoCheck();

    expect(component.token).toBe('updated-token');
    expect(component.getToken).toHaveBeenCalled();
  });

  it('should open admin panel dialog', () => {
    component.admin();

    expect(dialog.open).toHaveBeenCalledWith(AdminPanelComponent, {});
  });


});
