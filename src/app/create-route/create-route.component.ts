import {Component, OnInit} from '@angular/core';
import {RouteService} from "../services/route/route.service";
import {Route} from "../domain/Route";

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

  routes: Route[] = [];

  constructor(private routesService: RouteService) {
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe((obj) => this.routes = obj);
  }

  public createRoute(): void {
    // @ts-ignore
    this.routesService.createValidRoute(this.routeId, this.origin, this.destination, this.distance, this.timeDistance, this.energySpent, this.extraBatteryTime).subscribe();
    setTimeout(window.location.reload.bind(window.location), 200);
  }
}
