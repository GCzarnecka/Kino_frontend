import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { Movie } from '../../DataModel/Movie';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MovieFilterPipe} from "./movie-filter.pipe";

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;

  const movies: Movie[] = [
    { id: 1, title: 'Movie 1', duration: 120,
      author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
      category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    },
    { id: 2, title: 'Movie 2', duration: 118, poster: 'url', category: { id: 1, name: 'Category 1', description: 'desc' },
      ageRestriction: 12, author: { id: 1, name: 'Author 2', surname: 'Surname', age: 20 }, description: 'Description 2',
    },
  ];

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [MoviesComponent, MovieFilterPipe],
      providers: [{provide: MoviesService, useValue: {getMovies: jasmine.createSpy('getMovies').and.returnValue(of(movies))}} ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on initialization', () => {
    fixture.detectChanges();

    expect(component.movies).toEqual(movies);
    expect(moviesService.getMovies).toHaveBeenCalled();
  });


});
