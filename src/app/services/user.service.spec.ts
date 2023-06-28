import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { RestService } from './rest.service';
import { User } from '../DataModel/User';

describe('UserService', () => {
  let service: UserService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, RestService]
    });
    service = TestBed.inject(UserService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get user', () => {
    const testData: User = {
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

    service.getUser().subscribe(user => {
      expect(user).toEqual(testData);
    });

    const request = httpMock.expectOne('http://localhost:8080/logged/user');
    expect(request.request.method).toBe('GET');
    request.flush(testData);
  });
});
