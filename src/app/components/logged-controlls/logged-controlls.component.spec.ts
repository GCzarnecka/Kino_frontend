import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedControllsComponent } from './logged-controlls.component';

describe('LoggedControllsComponent', () => {
  let component: LoggedControllsComponent;
  let fixture: ComponentFixture<LoggedControllsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedControllsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedControllsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
