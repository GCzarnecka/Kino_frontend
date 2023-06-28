import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  let service: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestService]
    });
    service = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a GET request', () => {
    const testData = { id: 1, name: 'Test Data' };
    const path = 'test';
    const params = { param1: 'value1', param2: 'value2' };

    service.get<any>(path, params).subscribe(response => {
      expect(response).toEqual(testData);
    });

    const request = httpMock.expectOne(`http://localhost:8080/${path}?param1=value1&param2=value2`);
    expect(request.request.method).toBe('GET');
    request.flush(testData);
  });

  it('should send a POST request', () => {
    const testData = { id: 1, name: 'Test Data' };
    const path = 'test';
    const body = { data: 'test' };

    service.post<any>(path, body).subscribe(response => {
      expect(response).toEqual(testData);
    });

    const request = httpMock.expectOne(`http://localhost:8080/${path}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(body);
    request.flush(testData);
  });

  it('should send a DELETE request', () => {
    const testData = { id: 1, name: 'Test Data' };
    const path = 'test';
    const id = 1;

    service.delete<any>(path, id).subscribe(response => {
      expect(response).toEqual(testData);
    });

    const request = httpMock.expectOne(`http://localhost:8080/${path}/${id}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(testData);
  });
});
