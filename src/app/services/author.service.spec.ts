import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { RestService } from './rest.service';
import { Author } from '../DataModel/Author';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService, RestService]
    });
    authorService = TestBed.inject(AuthorService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve authors from the API', () => {
    const dummyAuthors: Author[] = [
      { id: 1, name: 'John Doe' ,surname: 'Doe', age: 20},
    ];

    authorService.getAuthors().subscribe(authors => {
      expect(authors).toEqual(dummyAuthors);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/authors');
    expect(request.request.method).toBe('GET');
    request.flush(dummyAuthors);
  });

  it('should add a new author via the API', () => {
    const newAuthor: Author = { id: 3, name: 'James Brown' ,surname: 'Brown', age: 20};

    authorService.postAuthor(newAuthor).subscribe(author => {
      expect(author).toEqual(newAuthor);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/authors');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newAuthor);
    request.flush(newAuthor);
  });
});
