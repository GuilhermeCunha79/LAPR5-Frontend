import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RouteService {
  private Url = 'http://localhost:3000/api/route/all';

  constructor(private httpClient: HttpClient) {
  }

  public extractData(res: any) {
    return res || {};
  }

  getAllRoutes(): Observable<any> {
    return this.httpClient.get(this.Url).pipe(map(this.extractData));
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
    let table = document.getElementById('table') as HTMLTableElement;

    this.getAllRoutes().forEach(function (i) {
      for (let j = 0; j < i.length; j++) {
        let tr = table.insertRow();

        let td_id = tr.insertCell();
        let td_origin = tr.insertCell();
        let td_destination = tr.insertCell();
        let td_distance = tr.insertCell();
        let td_timeDistance = tr.insertCell();
        let td_energySpent = tr.insertCell();
        let td_extraBatteryTime = tr.insertCell();

        console.log(i[j]);

        //td_id.innerText = i[j].warehouseIdentifier;
        //td_origin.innerText = i[j].designation;
        //td_destination.innerText = i[j].street;
        //td_distance.innerText = i[j].number;
        //td_timeDistance.innerText = i[j].postalCode;
        //td_energySpent.innerText = i[j].country;
        //td_extraBatteryTime.innerText = i[j].latitude;
      }
    });
  }
}
