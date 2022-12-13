import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../../message.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  public Url = 'https://localhost:3000/api/planning';


  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  public extractData(res: any) {
    return res || {};
  }

  getPlanning(params?: string): Observable<any> {
    if (params) {
      return this.httpClient.get(this.Url + "?" + params).pipe(map(this.extractData));
    } else {
      return this.httpClient.get(this.Url).pipe(map(this.extractData));
    }
  }

  createPlanning(planningId: string, licensePlate: string, date: string, warehouse: string): Observable<any> {

    const body = {
      "planningId": planningId,
      "licensePlate": licensePlate,
      "date": date,
      "warehouse": warehouse
    };

    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  createValidPlanning(planningId: string, licensePlate: string, date: string, warehouse: string): Observable<any> | null {
    if (!this.validateData(planningId)) return null;

    return this.createPlanning(planningId, licensePlate, date, warehouse);
  }


  validateData(licensePlate: string): boolean {

    let flag: boolean = true;

    if (licensePlate.length != 8) {
      this.log("ERROR: Please insert a valid License Plate");
      flag = false;
    }
    return flag;
  }

  log(message: string) {
    this.messageService.add(`Created: ${message}`);
  }
}
