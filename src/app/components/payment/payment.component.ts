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

  buy() {
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
        paid: true,
        // price: 20,
        reservationTime : new Date(),
        id: 0,
        archived: false
      }

      console.log(reservation,'reservation');


      this.reservationService.placeReservation(reservation).subscribe();
      // this.restService.post('logged/place-order', {...reservation}).subscribe();

    this.router.navigate(['/', 'home']);



    // this.http.get("http://localhost:8080/logged/user",
     //  { headers:
     //      new HttpHeaders({'Authorization': 'Bearer ' +
     //          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3NpYXh4eEBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTc3NDEsImV4cCI6MTY4NDk5Mzc0MX0.jKK1Ap7hSv-F91VtZKp9MfR8OnI6EbXm6ZXdknlyY5c"})}).subscribe();

    // const url = 'http://localhost:8080/logged/user';
    // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb3NpYXh4eEBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5NTc3NDEsImV4cCI6MTY4NDk5Mzc0MX0.jKK1Ap7hSv-F91VtZKp9MfR8OnI6EbXm6ZXdknlyY5c';
    //
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    //
    // this.http.get(url, { headers }).subscribe(
    //   (response) => {
    //     // Obsłuż otrzymaną odpowiedź
    //     console.log(response);
    //   },
    //   (error) => {
    //     // Obsłuż błąd żądania
    //     console.error(error);
    //   }
    // );


  }
}
