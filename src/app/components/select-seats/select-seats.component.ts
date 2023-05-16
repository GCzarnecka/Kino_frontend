import {Component, Input} from '@angular/core';
import {Seat} from "../../DataModel/Seat";
import {Screening} from "../../DataModel/Screening";

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent {

  @Input() screening!: Screening;
  seats: Array<Array<Seat>> = [];
  constructor() {
  }
  ngOnInit(): void {
    console.log(this.screening);
    for (let i = 0; i < this.screening.cinemaRoom.rowsNumber; i++) {
      this.seats.push([]);
      for (let j = 0; j < this.screening.cinemaRoom.columnsNumber; j++) {
        this.seats[i].push(this.screening.seats[i*this.screening.cinemaRoom.columnsNumber+j]);
      }
    }
  }

  onSeatClick(seat: Seat) {
    seat.taken = !seat.taken;
  }
}
