import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MovieInfoComponent } from './movie-info.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { MoviesService } from '../../services/movies.service';
import { AuthorService } from '../../services/author.service';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;
  let activatedRouteMock: any;
  let categoryServiceMock: any;
  let movieServiceMock: any;
  let authorServiceMock: any;

  beforeEach(
    waitForAsync(() => {
      activatedRouteMock = {
        snapshot: {
          paramMap: {
            get: () => 'true'
          }
        }
      };

      categoryServiceMock = {
        getCategories: jasmine.createSpy('getCategories').and.returnValue(of([]))
      };

      movieServiceMock = {
        getMovies: jasmine.createSpy('getMovies').and.returnValue(of([])),
        postMovie: jasmine.createSpy('postMovie').and.returnValue(of({}))
      };

      authorServiceMock = {
        getAuthors: jasmine.createSpy('getAuthors').and.returnValue(of([]))
      };

      TestBed.configureTestingModule({
        declarations: [MovieInfoComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: CategoryService, useValue: categoryServiceMock },
          { provide: MoviesService, useValue: movieServiceMock },
          { provide: AuthorService, useValue: authorServiceMock },
          // Add other dependencies
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch movies if "edit" flag is true', () => {
    expect(movieServiceMock.getMovies).toHaveBeenCalled();
  });

  it('should fetch categories and authors on initialization', () => {
    expect(categoryServiceMock.getCategories).toHaveBeenCalled();
    expect(authorServiceMock.getAuthors).toHaveBeenCalled();
  });

  it('should save changes when "saveChanges" method is called', () => {
    component.saveChanges();
    expect(movieServiceMock.postMovie).toHaveBeenCalledWith(component.movie);
  });


});
