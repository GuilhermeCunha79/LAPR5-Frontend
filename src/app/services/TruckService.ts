import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private Url = 'http://localhost:3000/api/truck/';

  constructor(private httpClient: HttpClient) { }

  createTruck(licensePlate: string ,autonomy:number, capacityCargo:number,capacityTransportation:number,battery: number, tare: number) {
    const body={"licensePlate":licensePlate, "autonomy":autonomy, "capacityCargo":capacityCargo, "capacityTransportation":capacityTransportation, "battery": battery, "tare":tare};
    return this.httpClient.post(this.Url,body)
      .pipe(map(this.extractData)
      );
  }

  public extractData(res: any) {
    return res || { };
  }

  getTrucks(): Observable<any> {
    return this.httpClient.get(this.Url + 'all').pipe(
      map(this.extractData));
  }

  listTable(): void {

    let tbody = document.getElementById('tbody') as HTMLTableElement;
    let array = this.getTrucks();

    array.forEach(function (i) {
      for (let j = 0; j < i.length; j++) {
        let tr = tbody.insertRow();

        let td_licensePlate = tr.insertCell();
        let td_autonomy = tr.insertCell();
        let td_capacityCargo = tr.insertCell();
        let td_capacityTransportation = tr.insertCell();
        let td_battery = tr.insertCell();
        let td_tare = tr.insertCell();

        td_licensePlate.innerText = i[j].licensePlate;
        td_autonomy.innerText = i[j].autonomy;
        td_capacityCargo.innerText = i[j].capacityCargo;
        td_capacityTransportation.innerText = i[j].capacityTransportation;
        td_battery.innerText = i[j].battery;
        td_tare.innerText = i[j].tare;
      }
    });
  }
}
