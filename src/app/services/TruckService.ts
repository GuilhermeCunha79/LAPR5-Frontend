import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {MessageService} from "../message.service";

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  private Url = 'http://localhost:3000/api/truck/';

  constructor(private httpClient: HttpClient, private messageService: MessageService) { }


  log(message:string){
    this.messageService.add(`Created Truck: ${message}`);
  }

  createValidTruck(licensePlate: string ,autonomy:number, capacityCargo:number,capacityTransportation:number,battery: number, tare: number){
    if (this.validateData(licensePlate,autonomy,capacityCargo,capacityTransportation,battery,tare)){
      this.createTruck(licensePlate,autonomy,capacityCargo,capacityTransportation,battery,tare);
    }
      else return this.log("ERROR while creating the truck");
  }


  createTruck(licensePlate: string ,autonomy:number, capacityCargo:number,capacityTransportation:number,battery: number, tare: number)  {
   // if (this.validateData(licensePlate, autonomy, capacityCargo, capacityTransportation, battery, tare)) {
      const body = {
        "licensePlate": licensePlate,
        "autonomy": autonomy,
        "capacityCargo": capacityCargo,
        "capacityTransportation": capacityTransportation,
        "battery": battery,
        "tare": tare
      };
      return this.httpClient.post(this.Url, body)
        .pipe(map(this.extractData)
        );
    //} else return this.log("ERROR while creating the truck")
  }

  public extractData(res: any) {
    return res || { };
  }

  getTrucks(): Observable<any> {
    return this.httpClient.get(this.Url + 'all').pipe(
      map(this.extractData));
  }

 /* getTruckByIdentifier(licensePlate: string): Observable<any> {
    return this.httpClient.get(this.Url + '?ls=' + licensePlate).pipe(map(this.extractData));
  }
*/

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


  validateData(licensePlate: string ,autonomy:number, capacityCargo:number,capacityTransportation:number,battery: number, tare: number):boolean {


    let flag: boolean=true;

    if (licensePlate.length!=8) {
      this.log("ERROR: Please insert a valid License Plate");
      flag=false;
    }

   /* if (this.getTruckByIdentifier(licensePlate)!=null){
      this.log("ERROR: Truck already exists with that licensePlate");
      flag=false;
    }
*/

    if (autonomy<=0) {
      this.log("ERROR: Autonomy must be positive");
      flag=false;
    }

    if (capacityCargo<=0){
      this.log("ERROR: Capacity Cargo must be positive");
    }

    if (capacityTransportation<=0){
      this.log("ERROR: Capacity Transportation must be positive");
    }

    if (battery<=0){
      this.log("ERROR: Battery must be positive");
    }

    if (tare<=0){
      this.log("ERROR: Tare must be positive");
    }

    return flag;


  }

}
