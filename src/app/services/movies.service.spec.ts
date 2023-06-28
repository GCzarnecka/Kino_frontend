import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { RestService } from './rest.service';
import { Movie } from '../DataModel/Movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService, RestService]
    });
    service = TestBed.inject(MoviesService);
    restService = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return movies', () => {
    const dummyMovies: Movie[] = [
      { id: 1, title: 'Movie 1', duration: 120,
        author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
        category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
        poster: 'url'
      },
      { id: 2, title: 'Movie 2', duration: 118, poster: 'url', category: { id: 1, name: 'Category 1', description: 'desc' },
        ageRestriction: 12, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, description: 'Description 2',
      },
    ];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(dummyMovies);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/movies');
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovies);
  });

  it('should return a specific movie', () => {
    const dummyMovie: Movie = {
      id: 1, title: 'Movie 1', duration: 120, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
      ageRestriction: 18, category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    }

    service.getMovie(1).subscribe(movie => {
      expect(movie).toEqual(dummyMovie);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/movie/1');
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovie);
  });

  it('should post a movie', () => {
    const movieToPost: Movie = {
      id: 1, title: 'Movie 1', duration: 120, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
      ageRestriction: 18, category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    }

    service.postMovie(movieToPost).subscribe(response => {
      expect(response).toEqual(movieToPost);
    });

    const request = httpMock.expectOne('http://localhost:8080/api/movies');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(movieToPost);
    request.flush(movieToPost);
  });
});
