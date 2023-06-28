import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Screening} from "../../DataModel/Screening";
import {Router} from "@angular/router";
import {Reservation} from "../../DataModel/Reservation";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-dialog-reservation',
  templateUrl: './dialog-reservation.component.html',
  styleUrls: ['./dialog-reservation.component.css']
})
export class DialogReservationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public screening: Screening,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  takenSeats: number[] = [];

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSeats($event: { takenSeats: number[]; screening: Screening }) {
    console.log($event);
    this.screening = $event.screening;
    this.takenSeats = $event.takenSeats;
  }

  buy(paid: boolean) {
    this.takenSeats.forEach(seatId => {
      this.screening.seats.forEach(seat => {
        if (seat.id === seatId) {
          seat.taken = true;
        }
      });
    });

    const reservation: Reservation = {
      screening: this.screening,
      seatsIds: this.takenSeats,
      price: this.takenSeats.length * this.screening.price,
      paid: paid,
      // price: 20,
      reservationTime : new Date(),
      id: 0,
      archived: false
    }

    this.reservationService.placeReservation(reservation).subscribe();

    this.dialogRef.close();
  }
}
