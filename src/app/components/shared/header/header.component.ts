import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private navbarService: NavbarService
  ) {
    this.isLoggedIn = navbarService._loggedIn;
  }

  ngOnInit() {
  }
}
