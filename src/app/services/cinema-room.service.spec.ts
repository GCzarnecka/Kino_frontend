import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CinemaRoomService } from './cinema-room.service';
import { RestService } from './rest.service';
import { CinemaRoom } from '../DataModel/CinemaRoom';

describe('CinemaRoomService', () => {
  let service: CinemaRoomService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CinemaRoomService, RestService]
    });
    service = TestBed.inject(CinemaRoomService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return cinema rooms', () => {
    const dummyCinemaRooms: CinemaRoom[] = [
      { id: 1, name: 'Room 1', rowsNumber: 10, columnsNumber: 10 },
      { id: 2, name: 'Room 2', rowsNumber: 10, columnsNumber: 10 }
    ];

    service.getCinemaRooms().subscribe(cinemaRooms => {
      expect(cinemaRooms).toEqual(dummyCinemaRooms);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/rooms');
    expect(request.request.method).toBe('GET');
    request.flush(dummyCinemaRooms);
  });
});
