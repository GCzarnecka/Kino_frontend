import { Component } from '@angular/core';
import {Movie} from "../../DataModel/Movie";
import {MoviesService} from "../../services/movies.service";
import {ScreeningsService} from "../../services/screenings.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  constructor(private moviesService: MoviesService,
              private screeingsService: ScreeningsService,
              private router: Router) { }


  movies!:Movie[];

  // movies: Array<object> = [];
  showImage(image: number) {
    this.router.navigate(['/', 'movie-details', image]);
  }

  ngOnInit(): void {
    // this.moviesService.getMovies().subscribe(movies => movies.forEach(movie => {
    //   this.movies.push({image: movie.poster, title: movie.title, thumbImage: movie.poster});
    //   console.log(movie);
    // }));
    this.moviesService.getMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
    // this.screeingsService.getScreeningsForMovie(6).subscribe(screenings =>
    //   console.log(screenings));
  }

}
