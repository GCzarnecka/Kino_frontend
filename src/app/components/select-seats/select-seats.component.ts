import { Component } from '@angular/core';
import {Seat} from "../../DataModel/Seat";

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent {
  seats: Array<Array<Seat>> = [];
  constructor() {
  }
  ngOnInit(): void {
    for (let i = 0; i < 6; i++) {
      this.seats.push([]);
      for (let j = 0; j < 10; j++) {
        this.seats[i].push({sectorNumber: i, seatNumber: j, isTaken: false, id: 0});
      }
    }
  }

  onSeatClick(seat: Seat) {
    seat.isTaken = !seat.isTaken;
  }
}
