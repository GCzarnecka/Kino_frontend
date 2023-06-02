import { Component } from '@angular/core';
import {Seat} from "../../DataModel/Seat";
import {UserService} from "../../services/user.service";
import {User} from "../../DataModel/User";
import {Reservation} from "../../DataModel/Reservation";
import {MatDialog} from "@angular/material/dialog";
import {DialogReservationComponent} from "../dialog-reservation/dialog-reservation.component";
import {DialogTicketComponent} from "../dialog-ticket/dialog-ticket.component";
import * as dns from "dns";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {


  constructor(private userService: UserService, public dialog: MatDialog, private reservationService: ReservationService) { }


  user!: User;

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user
      console.log(this.user)
    });

  }

  downloadTicket(reservation: Reservation) {
    const dialogRef = this.dialog.open(DialogTicketComponent, {
      data: reservation,
    });
    dialogRef.afterClosed().subscribe();
  }

  pay(reservation: Reservation) {
    reservation.paid = true;
    this.reservationService.updateReservation(reservation).subscribe();
  }

  cancelReservation(reservation: Reservation) {
    this.user.reservations = this.user.reservations.filter(r => r.id !== reservation.id);
    this.reservationService.deleteReservation(reservation).subscribe();
  }
}
