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
    return this.httpClient.get(this.Url).pipe(
      map(this.extractData));
  }

  getWarehouseByIdentifier(warehouseIdentifier: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByIdentifier/' + warehouseIdentifier).pipe(
      map(this.extractData));
  }

  getWarehouseByDesignation(designation: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByDesignation/' + designation).pipe(
      map(this.extractData));
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
    console.log(body);
    return this.httpClient.put(this.Url + '/ByIdentifier' + warehouseIdentifier, body)
      .pipe(map(this.extractData)
      );
  }

  public extractData(res: any) {
    return res || {};
  }


  listTable(): void {

    let tbody = document.getElementById('tbody') as HTMLTableElement;

    let array = this.getWarehouses();
    console.log(array);

    array.forEach(function (i) {


      console.log(i.length)

      for (let j = 0; j < i.length; j++) {
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_designation = tr.insertCell();
        let td_street = tr.insertCell();
        let td_number = tr.insertCell();
        let td_postalCode = tr.insertCell();
        let td_city = tr.insertCell();
        let td_latitude = tr.insertCell();
        let td_longitude = tr.insertCell();
        let td_altitude = tr.insertCell();

        td_id.innerText = i[j].warehouseIdentifier;
        td_designation.innerText = i[j].designation;
        td_street.innerText = i[j].street;
        td_number.innerText = i[j].number;
        td_postalCode.innerText = i[j].postalCode;
        td_city.innerText = i[j].country;
        td_latitude.innerText = i[j].latitude;
        td_longitude.innerText = i[j].longitude;
        td_altitude.innerText = i[j].altitude;
      }


    });


  }
}
