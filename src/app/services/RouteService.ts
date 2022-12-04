import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  private Url = 'https://lapr5-logistics.herokuapp.com/api/route';

  constructor(private httpClient: HttpClient) {
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
}
