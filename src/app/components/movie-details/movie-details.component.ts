import { Component } from '@angular/core';
import {Screening} from "../../DataModel/Screening";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs";
import {ScreeningsService} from "../../services/screenings.service";
import {DialogReservationComponent} from "../dialog-reservation/dialog-reservation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  constructor(private route: ActivatedRoute, private screeningService: ScreeningsService, public dialog: MatDialog) { }

  screenings: Array<Screening> = [];
  ngOnInit(): void {
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     params.get('id')!)).subscribe(id => {
    //   this.screeningService.getScreeningsForMovie(parseInt(id))
    //     .subscribe(screenings => {
    //     this.screenings = screenings;
    //     console.log(id,this.screenings);
    //   });
    //   }
    // )

    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.screeningService.getScreeningsForMovie(parseInt(id))
        .subscribe(screenings => {
          this.screenings = screenings;
          console.log(id, this.screenings);
        });
    }

  }
  openDialog(screening: Screening): void {
    console.log(screening,'dialog');
    const dialogRef = this.dialog.open(DialogReservationComponent, {
      data: screening,
    });

    dialogRef.afterClosed().subscribe();
  }

  days: Array<String> = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  pickedDate = new Date();

  showedScreenings: Array<Screening> = [];

  pickDate(day: String) {
    const todaysDay = new Date().getDay() - 1;
    const days = this.days.slice(todaysDay).concat(this.days.slice(0, todaysDay));
    const dayIndex = days.indexOf(day)+1;
    const date = new Date();
    this.pickedDate = new Date(date.setDate(date.getDate() +dayIndex-1));
    this.showScreenings(this.pickedDate);

  }
   showScreenings(date: Date) {
    this.showedScreenings = this.screenings.filter(screening => {
      screening.startTime = new Date(screening.startTime);
      return screening.startTime.getDay()=== date.getDay() && screening.startTime.getMonth() === date.getMonth() && screening.startTime.getFullYear() === date.getFullYear();
    });
  }


  getDays() {
      const todaysDay = new Date().getDay() - 1;
      return this.days.slice(todaysDay).concat(this.days.slice(0, todaysDay));

  }
}

