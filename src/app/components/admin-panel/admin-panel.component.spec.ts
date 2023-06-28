import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { AdminPanelComponent } from './admin-panel.component';
import { Screening } from '../../DataModel/Screening';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AdminPanelComponent>>;



  beforeEach(() => {
    const dialogRefSpyObj = jasmine.createSpyObj({ close: null });

    TestBed.configureTestingModule({
      declarations: [AdminPanelComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AdminPanelComponent>>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when closeDialog() is called', () => {
    component.closeDialog();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
