import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})

export class DefaultLayoutComponent implements OnInit {

  constructor(private signupService: AuthService) {
  }

  ngOnInit(): void {
    this.signupService.redirectToLogin();
  }

  logout() {
    sessionStorage.removeItem("user-data");
    this.signupService.redirectToLogin();
  }
}
