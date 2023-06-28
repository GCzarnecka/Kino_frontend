// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ScreeningInfoComponent } from './screening-info.component';
// import { CategoryService } from '../../services/category.service';
// import { MoviesService } from '../../services/movies.service';
// import { CinemaRoomService } from '../../services/cinema-room.service';
// import { ScreeningsService } from '../../services/screenings.service';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { ReactiveFormsModule } from '@angular/forms';
// import {HttpClient} from "@angular/common/http";
// import {NO_ERRORS_SCHEMA} from "@angular/core";
// import {MatFormField, MatLabel} from "@angular/material/form-field";
// import {MAT_SELECT_SCROLL_STRATEGY, MAT_SELECT_SCROLL_STRATEGY_PROVIDER, MatSelect} from "@angular/material/select";
// import {MatOption} from "@angular/material/core";
// import {MAT_DIALOG_DATA} from "@angular/material/dialog";
//
// describe('ScreeningInfoComponent', () => {
//   let component: ScreeningInfoComponent;
//   let fixture: ComponentFixture<ScreeningInfoComponent>;
//   let categoryService: CategoryService;
//   let movieService: MoviesService;
//   let cinemaRoomService: CinemaRoomService;
//   let screeningsService: ScreeningsService;
//   let router: Router;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ScreeningInfoComponent, MatFormField, MatLabel, MatSelect, MatOption],
//       imports: [ReactiveFormsModule],
//       providers: [
//         MAT_DIALOG_DATA,
//         MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
//         CategoryService,
//         MoviesService,
//         CinemaRoomService,
//         ScreeningsService,
//         {
//           provide: Router,
//           useValue: {
//             navigate: jasmine.createSpy('navigate')
//           }
//         },
//         {
//           provide: HttpClient,
//           useValue: {
//             get: jasmine.createSpy('get').and.returnValue(of([])),
//             post: jasmine.createSpy('post').and.returnValue(of([])),
//           }
//         }
//       ],
//       schemas:[NO_ERRORS_SCHEMA]
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ScreeningInfoComponent);
//     component = fixture.componentInstance;
//     categoryService = TestBed.inject(CategoryService);
//     movieService = TestBed.inject(MoviesService);
//     cinemaRoomService = TestBed.inject(CinemaRoomService);
//     screeningsService = TestBed.inject(ScreeningsService);
//     router = TestBed.inject(Router);
//     spyOn(router, 'navigate');
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should load movies and cinema rooms on initialization', () => {
//     const movies = [
//       { id: 1, title: 'Movie 1', duration: 120,
//         author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
//         category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
//         poster: 'url'
//       },
//       { id: 2, title: 'Movie 2', duration: 118, poster: 'url', category: { id: 1, name: 'Category 1', description: 'desc' },
//         ageRestriction: 12, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, description: 'Description 2',
//       },
//     ];
//     const cinemaRooms = [
//       { id: 1, name: 'Room 1', rowsNumber: 10, columnsNumber: 10 },
//       { id: 2, name: 'Room 2', rowsNumber: 10, columnsNumber: 10 }
//     ];
//     spyOn(movieService, 'getMovies').and.returnValue(of(movies));
//     spyOn(cinemaRoomService, 'getCinemaRooms').and.returnValue(of(cinemaRooms));
//
//     fixture.detectChanges();
//
//     expect(movieService.getMovies).toHaveBeenCalled();
//     expect(cinemaRoomService.getCinemaRooms).toHaveBeenCalled();
//     expect(component.movies).toEqual(movies);
//     expect(component.rooms).toEqual(cinemaRooms);
//   });
//
//   it('should add a new screening and navigate to home', () => {
//     const movie = { id: 1, title: 'Movie 1', duration: 120,
//       author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
//       category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
//       poster: 'url'
//     };
//     const room = { id: 1, name: 'Room 1', rowsNumber: 5, columnsNumber: 10 };
//     const price = 10;
//     const startTime = new Date();
//     spyOn(screeningsService, 'addScreening').and.returnValue(of({ id: 1,
//       movie: {
//       id: 1, title: 'Movie 1', duration: 120, author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 },
//       ageRestriction: 18, category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
//         poster: 'url'
//     }, startTime: new Date(),
//       cinemaRoom: { id: 1, name: 'Room 1', rowsNumber: 10, columnsNumber: 10 },
//       price: 50,
//         seats: [
//         { id: 1, sectorNumber: 1, seatNumber: 1, taken: false },
//         { id: 2, sectorNumber: 1, seatNumber: 2, taken: false },
//       ]
//     }));
//
//     component.movie = movie;
//     component.room = room;
//     component.price = price;
//     component.startTime = startTime;
//
//     component.add();
//
//     expect(screeningsService.addScreening).toHaveBeenCalledWith({
//       id: 0,
//       movie: movie,
//       cinemaRoom: room,
//       price: price,
//       startTime: startTime,
//       seats: [
//         { id: 0, sectorNumber: 0, seatNumber: 0, taken: false },
//         { id: 0, sectorNumber: 0, seatNumber: 1, taken: false },
//         // ... and so on, based on the rowsNumber and columnsNumber of the room
//       ]
//     });
//     expect(router.navigate).toHaveBeenCalledWith(['/', 'home']);
//   });
//
//   // Add more test cases to cover different scenarios
//
// });
