import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {MessageService} from "../../message.service";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  Url = 'https://lapr5-logistics.herokuapp.com/api/route';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  public extractData(res: any) {
    return res || {};
  }

  getRoutes(params?: string): Observable<any> {
    if (params) {
      return this.httpClient.get(this.Url + "?" + params).pipe(map(this.extractData));
    } else {
      return this.httpClient.get(this.Url).pipe(map(this.extractData));
    }
  }

  createValidRoute(routeId: string, origin: string, destination: string, distance: number, timeDistance: number, energySpent: number, extraBatteryTime: number): Observable<any> | null {
    if (!this.validateData(routeId, origin, destination, distance, timeDistance, energySpent, extraBatteryTime)) return null;

    return this.createRoute(routeId, origin, destination, distance, timeDistance, energySpent, extraBatteryTime);
  }

  createRoute(routeId: string, origin: string, destination: string, distance: number, timeDistance: number, energySpent: number, extraBatteryTime: number): Observable<any> {

    const body = {
      "routeId": routeId,
      "origin": origin,
      "destination": destination,
      "distance": distance,
      "timeDistance": timeDistance,
      "energySpent": energySpent,
      "extraBatteryTime": extraBatteryTime
    };

    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  fillRouteTable(params?: any): void {

    let routesArray;

    if (!params || Object.keys(params).length == 0) {
      routesArray = this.getRoutes();
    } else {
      if (params.routeId) {
        routesArray = this.getRoutes("routeId=" + params.routeId);
      } else if (params.origin) {
        routesArray = this.getRoutes("origin=" + params.origin);
      } else if (params.destination) {
        routesArray = this.getRoutes("destination=" + params.destination);
      } else if (params.distance) {
        routesArray = this.getRoutes("distance=" + params.distance);
      } else if (params.timeDistance) {
        routesArray = this.getRoutes("timeDistance=" + params.timeDistance);
      } else if (params.energySpent) {
        routesArray = this.getRoutes("energySpent=" + params.energySpent);
      } else {
        routesArray = this.getRoutes("extraBatteryTime=" + params.extraBatteryTime);
      }
    }

    routesArray.forEach(function (i) {
      for (let j = 0; j < i.length; j++) {

        const tr = (document.getElementById('list-table') as HTMLTableElement).insertRow();

        tr.insertCell().innerText = i[j].routeId;
        tr.insertCell().innerText = i[j].origin;
        tr.insertCell().innerText = i[j].destination;
        tr.insertCell().innerText = i[j].distance;
        tr.insertCell().innerText = i[j].timeDistance;
        tr.insertCell().innerText = i[j].energySpent;
        tr.insertCell().innerText = i[j].extraBatteryTime;
      }
    });
  }

  validateData(routeId: string, origin: string, destination: string, distance: number, timeDistance: number, energySpent: number, extraBatteryTime: number): boolean {

    if (routeId == null) {
      this.log("ERROR: Route Id can't be null.");
      return false;
    }

    if (origin == null) {
      this.log("ERROR: Route origin can't be null.");
      return false;
    }

    if (destination == null) {
      this.log("ERROR: Route destination can't be null.");
      return false;
    }

    if (distance == null) {
      this.log("ERROR: Route distance can't be null.");
      return false;
    }

    if (timeDistance == null) {
      this.log("ERROR: Route timeDistance can't be null.");
      return false;
    }

    if (energySpent == null) {
      this.log("ERROR: Route energySpent can't be null.");
      return false;
    }

    if (extraBatteryTime == null) {
      this.log("ERROR: Route extraBatteryTime can't be null.");
      return false;
    }

    return false;
  }

  log(message: string) {
    this.messageService.add(`Created Truck: ${message}`);
  }
}
