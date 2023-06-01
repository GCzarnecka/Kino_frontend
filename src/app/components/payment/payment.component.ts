import {Component, Input} from '@angular/core';
import {Screening} from "../../DataModel/Screening";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../DataModel/Reservation";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Seat} from "../../DataModel/Seat";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  screening!: Screening;
  takenSeats: Array<number> = [];
  // seats: Array<Seat> = [];

  constructor(private activatedRoute: ActivatedRoute,
              private reservationService: ReservationService,
              private http: HttpClient,
              private router: Router) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params,'params');
      this.screening = JSON.parse(params['screening']);
      this.takenSeats = JSON.parse(params['takenSeats']);
      console.log(this.screening,'screening');
    });
  }

  buy(paid: boolean) {
    // this.screening.price = 10;
    this.takenSeats.forEach(seatId => {
      this.screening.seats.forEach(seat => {
        if (seat.id === seatId) {
          seat.taken = true;
        }
      });
    });
    console.log(this.takenSeats,'takenSeats');
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

    console.log(reservation,'reservation');


    this.reservationService.placeReservation(reservation).subscribe();
    // this.restService.post('logged/place-order', {...reservation}).subscribe();

    this.router.navigate(['/', 'home']);
  }
}
