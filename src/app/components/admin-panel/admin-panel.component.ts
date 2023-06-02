import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Screening} from "../../DataModel/Screening";
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {

  constructor(
    public dialogRef: MatDialogRef<AdminPanelComponent>,
    @Inject(MAT_DIALOG_DATA) public screening: Screening
  ) {}
  closeDialog() {
    this.dialogRef.close();

  }
}
