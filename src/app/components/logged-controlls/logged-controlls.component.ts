import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../DataModel/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logged-controlls',
  templateUrl: './logged-controlls.component.html',
  styleUrls: ['./logged-controlls.component.css']
})
export class LoggedControllsComponent {
  name: string = '';

  constructor(private userService: UserService, private router:Router) { }


  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/', 'home']);
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe( user => {
      this.name = user.name
    });
  }

}
