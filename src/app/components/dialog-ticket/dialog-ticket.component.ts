import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Screening} from "../../DataModel/Screening";
import {Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../DataModel/Reservation";



@Component({
  selector: 'app-dialog-ticket',
  templateUrl: './dialog-ticket.component.html',
  styleUrls: ['./dialog-ticket.component.css']
})
export class DialogTicketComponent {
  reservationText: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public reservation: Reservation,
  ) {

    const data = {id: this.reservation.id, seats: this.reservation.seatsIds, movie: this.reservation.screening.movie.title, screeningTime: this.reservation.screening.startTime,  price: this.reservation.price, paid: this.reservation.paid, reservationTime: this.reservation.reservationTime};
    this.reservationText = JSON.stringify(data);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
