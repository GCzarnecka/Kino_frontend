import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../DataModel/Category";
import {MoviesService} from "../../services/movies.service";
import {Movie} from "../../DataModel/Movie";
import {Author} from "../../DataModel/Author";
import {AuthorService} from "../../services/author.service";
import {switchMap} from "rxjs";
import {ActivatedRoute, ParamMap, Route} from "@angular/router";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit{

  movie!: Movie;
  constructor(private categoryService: CategoryService,
              private movieService: MoviesService,
              private authorService: AuthorService,
              private route: ActivatedRoute) { }


  edit: boolean = false;
  categories: Category[] = [];

  authors: Author[] = [];

  movies: Movie[] = [];

  ngOnInit(): void {
    this.edit = coerceBooleanProperty(this.route.snapshot.paramMap.get('edit'));

    if(this.edit) {
      this.movieService.getMovies().subscribe(movies => {
        this.movies = movies
        console.log(this.movies);
      });
    }

    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.authorService.getAuthors().subscribe(authors => this.authors = authors);



    this.movie = {
        id: 0,
        title: "",
        description: "",
        duration: 0,
        ageRestriction: 0,
        category: {
          id: 0,
          name: "",
          description: ""

        },
        author: {
          id: 0,
          name: "",
          surname: "",
          age: 0,
        },
      poster: ""
    };

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
    });

    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors
    });

  }

  compareObjects(o1: any, o2: any) {
    if(o1.id == o2.id )
      return true;
    else return false
  }

  saveChanges() {
  console.log(this.movie);
    this.movieService.postMovie(this.movie).subscribe();
  }

  goBack() {
    window.history.back();
  }
}
