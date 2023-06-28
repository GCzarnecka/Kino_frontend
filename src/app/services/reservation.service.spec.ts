import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReservationService } from './reservation.service';
import { RestService } from './rest.service';
import { Reservation } from '../DataModel/Reservation';

describe('ReservationService', () => {
  let service: ReservationService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationService, RestService]
    });
    service = TestBed.inject(ReservationService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyReservation: Reservation = {
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

  it('should place a reservation', () => {

    service.placeReservation(dummyReservation).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toEqual(dummyReservation);
    });

    const request = httpMock.expectOne('http://localhost:8080/logged/place-order');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(dummyReservation);
    request.flush(dummyReservation);
  });

  it('should update a reservation', () => {
    service.updateReservation(dummyReservation).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toEqual(dummyReservation);
    });

    const request = httpMock.expectOne('http://localhost:8080/logged/reservation');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(dummyReservation);
    request.flush(dummyReservation);
  });

  it('should delete a reservation', () => {
    service.deleteReservation(dummyReservation).subscribe(response => {
      expect(response).toBeDefined();
      expect(response).toEqual(dummyReservation);
    });

    const request = httpMock.expectOne('http://localhost:8080/logged/reservation/1');
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyReservation);
  });
});
