import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Screening} from "../../DataModel/Screening";

@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.css']
})
export class DialogReservationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Screening,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
