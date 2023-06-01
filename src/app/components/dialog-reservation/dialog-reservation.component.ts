import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Screening} from "../../DataModel/Screening";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.css']
})
export class DialogReservationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public screening: Screening,
    private router: Router
  ) {}

  private takenSeats: number[] = [];

  ngOnInit(): void {
    console.log("dddd", this.screening);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onReserveClick() {
    this.dialogRef.close();
    console.log("HALOOOOO",this.screening);
    this.router.navigate(['/', 'payment', {screening: JSON.stringify(this.screening), takenSeats: JSON.stringify(this.takenSeats)}]);
  }

  updateSeats($event: { takenSeats: number[]; screening: Screening }) {
    console.log($event);
    this.screening = $event.screening;
    this.takenSeats = $event.takenSeats;
  }
}
