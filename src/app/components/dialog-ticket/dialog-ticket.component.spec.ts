import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogTicketComponent } from './dialog-ticket.component';
import {Reservation} from "../../DataModel/Reservation";
import {QRCodeComponent} from "angularx-qrcode";

describe('DialogTicketComponent', () => {
  let component: DialogTicketComponent;
  let fixture: ComponentFixture<DialogTicketComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const reservation: Reservation = {
    id: 1,
    screening: { id: 1,
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
    },
    seatsIds: [6, 7, 8],
    price: 70,
    paid: true,
    reservationTime: new Date(),
    archived: false
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DialogTicketComponent, QRCodeComponent],
        providers: [
          { provide: MatDialogRef, useValue: mockDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: reservation }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize reservationText correctly', () => {

    const data = {
      id: reservation.id,
      seats: reservation.seatsIds,
      movie: reservation.screening.movie.title,
      screeningTime: reservation.screening.startTime,
      price: reservation.price,
      paid: reservation.paid,
      reservationTime: reservation.reservationTime
    };

    const expectedReservationText = JSON.stringify(data);

    expect(component.reservationText).toBe(expectedReservationText);
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

});
