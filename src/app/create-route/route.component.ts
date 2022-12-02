import {Component, OnInit} from '@angular/core';
import {RouteService} from "../services/RouteService";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})

export class RouteComponent implements OnInit {

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

  routes: Route[];

  constructor(private routesService: RouteService) {
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe((obj) => this.routes = obj);
  }

  public createRoute(): void {
    this.routesService.createRoute(this.routeId, this.origin, this.destination, this.distance, this.timeDistance, this.energySpent, this.extraBatteryTime).subscribe();
    setTimeout(window.location.reload.bind(window.location), 200);
  }
}
