import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login-screen',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})

export class PageLoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private signupService: AuthService, private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.signupService.redirectToHome();

    this.authService.signOut();

    this.authService.authState.subscribe((user) => {
      if (user.idToken) {
        sessionStorage.setItem("google-user", JSON.stringify(user));

        this.login(user.email, "0000000000000000");

        this.signupService.redirect('/signup');
      }
    });
  }

  login(email: string, password: string): void {
    this.signupService.getUser(email, password)?.subscribe(obj => {
      sessionStorage.setItem("user-data", JSON.stringify(obj));
      this.signupService.redirectToHome();
    });
  }
}
