import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{

  public token: string | null = null;

  ngOnInit(): void {
    this.token = this.getToken();
  }

  ngDoCheck(): void {
    this.token = this.getToken()
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

}
