import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{

  public token: string | null = null;

  public isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.getToken();
    this.userService.getUser().subscribe(user => {
      this.isAdmin = user.role === 'ADMIN';
      // console.log(user);
    });
    // this.userService.getUser(
    // ).subscribe( user => {
    //   this.isAdmin = user.isAdmin
    // });
  }

  ngDoCheck(): void {
    this.token = this.getToken()
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

}
