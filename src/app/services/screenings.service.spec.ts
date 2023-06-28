import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ScreeningsService } from './screenings.service';
import { RestService } from './rest.service';
import { Screening } from '../DataModel/Screening';

describe('ScreeningsService', () => {
  let service: ScreeningsService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ScreeningsService, RestService]
    });
    service = TestBed.inject(ScreeningsService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const testData: Screening[] = [
    { id: 1,
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
    { id: 2,
      movie: {
        id: 1, title: 'Movie 2', duration: 120, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
        ageRestriction: 18, category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
        poster: 'url'
      }, startTime: new Date(),
      cinemaRoom: { id: 2, name: 'Room 2', rowsNumber: 10, columnsNumber: 10 },
      price: 60,
      seats: [
        { id: 1, sectorNumber: 1, seatNumber: 1, taken: false },
        { id: 2, sectorNumber: 1, seatNumber: 2, taken: false },
      ]
    }
  ];

  it('should get screenings for a movie', () => {
    const movieId = 1;

    service.getScreeningsForMovie(movieId).subscribe(screenings => {
      expect(screenings).toEqual(testData);
    });

    const request = httpMock.expectOne(`http://localhost:8080/api/screenings?movieId=${movieId}`);
    expect(request.request.method).toBe('GET');
    request.flush(testData);
  });

  it('should add a screening', () => {
    service.addScreening(testData[0]).subscribe(response => {
      expect(response).toEqual(testData[0]);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/screenings');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(testData[0]);
    request.flush(testData[0]);
  });
});
