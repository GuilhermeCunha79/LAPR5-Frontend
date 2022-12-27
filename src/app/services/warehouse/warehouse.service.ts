import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {MessageService} from "../../message.service";

@Injectable({
  providedIn: 'root'
})

export class WarehouseService {
  public Url = 'https://localhost:5001/api/Warehouses';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  log(message: string) {
    this.messageService.add(`Created Truck: ${message}`);
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

  createValidWarehouse(warehouseIdentifier: string, designation: string, street: string, number: number, postalCode: string, country: string, latitude: number, longitude: number, altitude: number): Observable<any> | null {
    if (this.validateData(warehouseIdentifier, designation, street, number, postalCode, country, latitude, longitude, altitude)) {
      return this.createWarehouse(warehouseIdentifier, designation, street, number, postalCode, country, latitude, longitude, altitude);
    } else return null;
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

  updateWarehouse(warehouseIdentifier: string, designation: string, street: string, number: number, postalCode: string, country: string, latitude: number, longitude: number, altitude: number) {
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


  validateData(warehouseIdentifier: string, designation: string, street: string, number: number, postalCode: string, country: string, latitude: number, longitude: number, altitude: number): boolean {


    let flag: boolean = true;

    if (warehouseIdentifier.length > 3) {
      this.log("ERROR: Warehouse Id can't have more than 3 characters");
      flag = false;
    }

    // console.log(this.getTruckByIdentifier(licensePlate))
    // if (this.getTruckByIdentifier(licensePlate) as Object != null) {
    //   this.log("ERROR: Truck already exists with that licensePlate");
    //   flag = false;
    // }


    if (designation.length > 50) {
      this.log("ERROR: Designation can't have more than 50 characters");
      flag = false;
    }

    if (street == null) {
      this.log("ERROR: Street must be inserted");
      flag = false;
    }

    if (number == null) {
      this.log("ERROR: Street number must be inserted");
      flag = false;
    }
    if (postalCode == null || postalCode.length > 8) {
      this.log("ERROR: Please insert a valid postal code (xxxx-xxx)");
      flag = false;
    }

    if (country == null) {
      this.log("ERROR: Country number must be inserted");
      flag = false;
    }
    if (latitude == null) {
      this.log("ERROR: Latitude number must be inserted");
      flag = false;
    }
    if (longitude == null) {
      this.log("ERROR: Longitude number must be inserted");
      flag = false;
    }

    if (altitude <= 0) {
      this.log("ERROR: Altitude must be positive");
      flag = false;
    }
    return flag;


  }
}
