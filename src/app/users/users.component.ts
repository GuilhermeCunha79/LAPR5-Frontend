import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {User} from "../domain/User";

@Component({
  selector: 'app-signup-screen',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  user: User;
  searchEmail: string;
  searchFirstName: string;
  searchLastName: string;
  searchPhoneNumber: string;
  searchRole: string;

  users: User[];

  permissions: number[] = [4];

  constructor(private signupService: AuthService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkPermission(this.permissions);
    this.getUsers();
  }

  public getUsers(): void {

    this.signupService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  public cancelUser(email:string,firstName:string,lastName:string,phoneNumber:string,role:number): void {
    this.signupService.cancelUser1(email,firstName,lastName,phoneNumber,role).subscribe(data => {
      this.user = data;
    });
    setTimeout(window.location.reload.bind(window.location), 500);
  }

}
