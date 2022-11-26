import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  private Url = 'https://localhost:5001/api/Warehouses';

  constructor(private httpClient: HttpClient) {
  }

  getWarehouses(): Observable<any> {
    return this.httpClient.get(this.Url).pipe(map(this.extractData));
  }

  getWarehouseByIdentifier(warehouseIdentifier: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByIdentifier/' + warehouseIdentifier).pipe(map(this.extractData));
  }

  getWarehouseByDesignation(designation: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByDesignation/' + designation).pipe(map(this.extractData));
  }

  createWarehouse(warehouseIdentifier: string, designation: string, street: string, number: number, postalCode: string, country: string, latitude: number, longitude: number, altitude: number): Observable<any> {
    const body = {
      "warehouseIdentifier": warehouseIdentifier,
      "designation": designation,
      "street": street,
      "number": number,
      "postalCode": postalCode,
      "country": country,
      "latitude": latitude,
      "longitude": longitude,
      "altitude": altitude
    };

    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  updateWarehouse(warehouseIdentifier: string, designation: string, street: number, number: number, postalCode: string, country: string, latitude: number, longitude: number, altitude: number) {
    const body = {
      "warehouseIdentifier": warehouseIdentifier,
      "designation": designation,
      "street": street,
      "number": number,
      "postalCode": postalCode,
      "country": country,
      "latitude": latitude,
      "longitude": longitude,
      "altitude": altitude
    };

    return this.httpClient.put(this.Url + '/ByIdentifier' + warehouseIdentifier, body).pipe(map(this.extractData));
  }

  public extractData(res: any) {
    return res || {};
  }

  listTable(): void {

    this.getWarehouses().forEach(function (i) {
      for (let j = 0; j < i.length; j++) {

        const tr = (document.getElementById('tbody') as HTMLTableElement).insertRow();

        tr.insertCell().innerText = i[j].warehouseIdentifier;
        tr.insertCell().innerText = i[j].designation;
        tr.insertCell().innerText = i[j].street;
        tr.insertCell().innerText = i[j].number;
        tr.insertCell().innerText = i[j].postalCode;
        tr.insertCell().innerText = i[j].country;
        tr.insertCell().innerText = i[j].latitude;
        tr.insertCell().innerText = i[j].longitude;
        tr.insertCell().innerText = i[j].altitude;
      }
    });
  }
}
