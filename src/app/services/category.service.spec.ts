import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthorService} from "./author.service";
import {RestService} from "./rest.service";
import {Author} from "../DataModel/Author";
import {Category} from "../DataModel/Category";

describe('CategoryService', () => {
  let service: CategoryService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService, RestService]
    });
    service = TestBed.inject(CategoryService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should return categories', () => {
    const dummy: Category[] = [
      { id: 1, name: 'Action', description: 'Action movies' },
      { id: 2, name: 'Comedy', description: 'Comedy movies' },
    ];

    service.getCategories().subscribe(categories => {
      expect(categories).toEqual(dummy);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/categories');
    expect(request.request.method).toBe('GET');
    request.flush(dummy);
  });


});
