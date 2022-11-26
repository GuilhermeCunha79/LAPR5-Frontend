import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RouteService {

  private Url = 'http://localhost:3000/api/route/';

  constructor(private httpClient: HttpClient) {
  }

  public extractData(res: any) {
    return res || {};
  }

  getAllRoutes(): Observable<any> {
    return this.httpClient.get(this.Url + 'all/').pipe(map(this.extractData));
  }

  createRoute(routeId: string, origin: string, destination: string, distance: number, timeDistance: number, energySpent: number, extraTimeBattery: number): Observable<any> {
    const body = {
      "routeId": routeId,
      "origin": origin,
      "destination": destination,
      "distance": distance,
      "timeDistance": timeDistance,
      "energySpent": energySpent,
      "extraTimeBattery": extraTimeBattery
    };

    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  fillRouteTable(): void {

    this.getAllRoutes().forEach(function (i) {
      for (let j = 0; j < i.length; j++) {

        const tr = (document.getElementById('list-table') as HTMLTableElement).insertRow();

        tr.insertCell().innerText = i[j].routeId;
        tr.insertCell().innerText = i[j].origin;
        tr.insertCell().innerText = i[j].destination;
        tr.insertCell().innerText = i[j].distance;
        tr.insertCell().innerText = i[j].timeDistance;
        tr.insertCell().innerText = i[j].energySpent;
        tr.insertCell().innerText = i[j].extraTimeBattery;
      }
    });
  }
}
