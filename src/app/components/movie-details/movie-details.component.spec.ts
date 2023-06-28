import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ScreeningsService } from '../../services/screenings.service';
import { DialogReservationComponent } from '../dialog-reservation/dialog-reservation.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let activatedRouteMock: any;
  let screeningsServiceMock: any;
  let dialogMock: any;

  const screening = { id: 1,
    movie: {
      id: 1, title: 'Movie 1', duration: 120, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
      ageRestriction: 18, category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    }, startTime: new Date(),
    cinemaRoom: { id: 1, name: 'Room 1', rowsNumber: 10, columnsNumber: 10 },
    price: 50,
    seats: [
      { id: 1, sectorNumber: 1, seatNumber: 1, taken: false },
      { id: 2, sectorNumber: 1, seatNumber: 2, taken: false },
    ]
  }

  beforeEach(
    waitForAsync(() => {
      activatedRouteMock = {
        snapshot: {
          paramMap: {
            get: () => '1'
          }
        }
      };

      screeningsServiceMock = {
        getScreeningsForMovie: jasmine.createSpy('getScreeningsForMovie').and.returnValue(of([screening]))
      };

      dialogMock = jasmine.createSpyObj('MatDialog', {
        open: {
          afterClosed: () => of(true)
        }
      });

      TestBed.configureTestingModule({
        declarations: [MovieDetailsComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: ScreeningsService, useValue: screeningsServiceMock },
          { provide: MatDialog, useValue: dialogMock },
          // Add other dependencies
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch screenings for the movie on initialization', () => {
    expect(screeningsServiceMock.getScreeningsForMovie).toHaveBeenCalledWith(1);
  });

  it('should open a dialog when the "openDialog" method is called', () => {
    component.openDialog(screening);
    expect(dialogMock.open).toHaveBeenCalledWith(DialogReservationComponent, {
      data: screening
    });
  });


});
