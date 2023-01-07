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

  blockInput: boolean = false;
  blockSignup: boolean = false;

  constructor(private signupService: AuthService) {
  }

  ngOnInit(): void {
    this.signupService.redirectToHome();

    const googleUser = JSON.parse(sessionStorage.getItem("google-user")!);
    if (googleUser) {
      this.blockInput = true;
      this.email = googleUser.email;
      this.password = "0000000000000000"
      this.firstName = googleUser.firstName;
      this.lastName = googleUser.lastName;
      this.phoneNumber = "939347107";
    }
  }

  signup(): void {
    this.signupService.createValidUser(this.email, this.password, this.firstName, this.lastName, this.phoneNumber, this.role)?.subscribe(obj => {
      sessionStorage.setItem("user-data", JSON.stringify(obj.userDTO));
      this.signupService.redirectToHome();
    });
  }

  returnToLogin(): void {
    sessionStorage.removeItem("google-user");
    this.signupService.redirect('/login');
  }
}
