import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatsComponent } from './select-seats.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SelectSeatsComponent', () => {
  let component: SelectSeatsComponent;
  let fixture: ComponentFixture<SelectSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSeatsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
