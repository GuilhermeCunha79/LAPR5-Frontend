import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup-screen',
  templateUrl: './page-signup.component.html',
  styleUrls: ['./page-signup.component.css']
})

export class PageSignupComponent implements OnInit {

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: number = 1;

  constructor(private signupService: AuthService) {
  }

  ngOnInit(): void {
    this.signupService.redirectToHome();
  }

  signup(): void {
    this.signupService.createValidUser(this.email, this.password, this.firstName, this.lastName, this.phoneNumber, this.role)?.subscribe(obj => {
      sessionStorage.setItem("user-data", JSON.stringify(obj.userDTO));
      this.signupService.redirectToHome();
    });
  }
}
