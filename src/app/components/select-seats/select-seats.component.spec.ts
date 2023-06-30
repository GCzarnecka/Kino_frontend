import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatsComponent } from './select-seats.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SelectSeatsComponent', () => {
  let component: SelectSeatsComponent;
  let fixture: ComponentFixture<SelectSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSeatsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectSeatsComponent);
    component = fixture.componentInstance;
    component.screening = {
      id: 1,
      movie: {
        id: 1,
        title: 'Movie 1',
        duration: 120,
        author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
        ageRestriction: 18,
        category: { id: 1, name: 'Category 1', description: 'desc' },
        description: 'Description 1',
        poster: 'url',
      },
      startTime: new Date(),
      cinemaRoom: { id: 1, name: 'Room 1', rowsNumber: 1, columnsNumber: 2 },
      price: 50,
      seats: [
        { id: 1, sectorNumber: 1, seatNumber: 1, taken: false },
        { id: 2, sectorNumber: 1, seatNumber: 2, taken: false },
      ],
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
