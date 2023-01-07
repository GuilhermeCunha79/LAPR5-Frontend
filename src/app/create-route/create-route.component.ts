import {Component, OnInit} from '@angular/core';
import {RouteService} from "../services/route/route.service";
import {Route} from "../domain/Route";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})

export class CreateRouteComponent implements OnInit {

  routeId: string;
  origin: string;
  destination: string;
  distance: number;
  timeDistance: number;
  energySpent: number;
  extraBatteryTime: number;

  searchRouteId: string;
  searchOrigin: string;
  searchDestination: string;
  searchDistance: number;
  searchTimeDistance: number;
  searchEnergySpent: number;
  searchExtraBatteryTime: number;

  listSize: number = 10;
  pageNumber: number = 1;

  routes: Route[] = [];

  permissions: number[] = [1,4]

  constructor(private routesService: RouteService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe((obj) => this.routes = obj);

    const token = JSON.parse(sessionStorage.getItem("user-data")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.authService.redirect("/home")
      }
    }
  }

  public createRoute(): void {
    // @ts-ignore
    this.routesService.createValidRoute(this.routeId, this.origin, this.destination, this.distance, this.timeDistance, this.energySpent, this.extraBatteryTime).subscribe();
    setTimeout(window.location.reload.bind(window.location), 200);
  }

  changePage(right: boolean): void {
    if (right) {
      this.pageNumber++;

      const maxPageNumber = Math.ceil(this.routes.length/this.listSize);
      if (this.pageNumber > maxPageNumber) this.pageNumber = maxPageNumber;
    }
    else {
      this.pageNumber--;

      if (this.pageNumber < 1) this.pageNumber = 1;
    }
  }
}
