import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = { id: 1, title: 'Movie 1', duration: 120,
      author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
      category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    };
    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
