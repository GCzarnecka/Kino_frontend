import {Component, OnInit} from '@angular/core';
import {Movie} from "../../DataModel/Movie";
import {MoviesService} from "../../services/movies.service";
import {ScreeningsService} from "../../services/screenings.service";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }


  movies!:Movie[];

  searchText = '';


  ngOnInit(): void {

    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });


  }

}
