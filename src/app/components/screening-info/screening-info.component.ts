import { Component } from '@angular/core';
import {Movie} from "../../DataModel/Movie";
import {CategoryService} from "../../services/category.service";
import {MoviesService} from "../../services/movies.service";
import {AuthorService} from "../../services/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CinemaRoom} from "../../DataModel/CinemaRoom";
import {CinemaRoomService} from "../../services/cinema-room.service";
import {ScreeningsService} from "../../services/screenings.service";

@Component({
  selector: 'app-screening-info',
  templateUrl: './screening-info.component.html',
  styleUrls: ['./screening-info.component.css']
})
export class ScreeningInfoComponent {
  movie!: Movie;
  movies: Movie[] = [];
  room!: CinemaRoom;

  rooms: CinemaRoom[] = [];
  price: number = 0;
  startTime!: Date;


  constructor(private categoryService: CategoryService,
              private movieService: MoviesService,
              private cinemaRoomService: CinemaRoomService,
              private screeningsService: ScreeningsService,

              private router: Router) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies
    });

    this.cinemaRoomService.getCinemaRooms().subscribe(rooms => {
      this.rooms = rooms
    });
  }

  add() {

    const seats = [];

    for(let i = 0; i < this.room.rowsNumber; i++) {
      for(let j = 0; j < this.room.columnsNumber; j++) {
        seats.push({
          id: 0,
          sectorNumber: i,
          seatNumber: j,
          taken: false
        })
      }
    }

    this.screeningsService.addScreening({
      id: 0,
      movie: this.movie,
      cinemaRoom: this.room,
      price: this.price,
      startTime: this.startTime,
      seats: seats
    }).subscribe();

    this.router.navigate(['/', 'home']);

  }
}
