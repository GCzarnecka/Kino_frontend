import { Component } from '@angular/core';
import {Screening} from "../../DataModel/Screening";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs";
import {ScreeningsService} from "../../services/screenings.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  constructor(private route: ActivatedRoute, private screeningService: ScreeningsService) { }

  screenings: Array<Screening> = [];
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        params.get('id')!)).subscribe(id => {
      this.screeningService.getScreeningsForMovie(parseInt(id))
        .subscribe(screenings => {
        this.screenings = screenings;
        console.log(id,this.screenings);
      });
      }
    )

  }


}
