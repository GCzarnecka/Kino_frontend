import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { DialogReservationComponent } from './dialog-reservation.component';
import { Screening } from '../../DataModel/Screening';
import { Reservation } from '../../DataModel/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { SelectSeatsComponent } from '../select-seats/select-seats.component';

describe('DialogReservationComponent', () => {
  let component: DialogReservationComponent;
  let fixture: ComponentFixture<DialogReservationComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogReservationComponent>>;
  let routerSpy: jasmine.SpyObj<Router>;
  let reservationServiceSpy: jasmine.SpyObj<ReservationService>;

  const mockScreening: Screening = {
    id: 1,
    movie: {
      id: 1,
      title: 'Movie 1',
      duration: 120,
      author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
      ageRestriction: 18,
      category: { id: 1, name: 'Category 1', description: 'desc' },
      description: 'Description 1',
      poster: 'url',
    },
    startTime: new Date(),
    cinemaRoom: { id: 1, name: 'Room 1', rowsNumber: 10, columnsNumber: 10 },
    price: 50,
    seats: [
      { id: 1, sectorNumber: 1, seatNumber: 1, taken: false },
      { id: 2, sectorNumber: 1, seatNumber: 2, taken: false },
    ],
  };

  beforeEach(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ close: null });
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const reservationServiceSpyObj = jasmine.createSpyObj(
      'ReservationService',
      ['placeReservation']
    );

    TestBed.configureTestingModule({
      declarations: [DialogReservationComponent, SelectSeatsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: mockScreening },
        { provide: Router, useValue: routerSpyObj },
        { provide: ReservationService, useValue: reservationServiceSpyObj },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogReservationComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DialogReservationComponent>
    >;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    reservationServiceSpy = TestBed.inject(
      ReservationService
    ) as jasmine.SpyObj<ReservationService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onNoClick() is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should update the screening and takenSeats when updateSeats() is called', () => {
    const event = { takenSeats: [2], screening: mockScreening };
    component.updateSeats(event);

    expect(component.screening).toEqual(mockScreening);
    expect(component.takenSeats).toEqual([2]);
  });

  it('should mark seats as taken, place a reservation, and close the dialog when buy() is called', () => {
    component.takenSeats = [1];
    component.screening.seats[0].taken = false;
    const reservation: Reservation = {
      screening: component.screening,
      seatsIds: component.takenSeats,
      price: component.takenSeats.length * component.screening.price,
      paid: true,
      reservationTime: new Date(),
      id: 0,
      archived: false,
    };

    reservationServiceSpy.placeReservation.and.returnValue(of(reservation));

    component.buy(true);

    expect(component.screening.seats[0].taken).toBe(true);
    expect(reservationServiceSpy.placeReservation).toHaveBeenCalledWith(
      reservation
    );
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
