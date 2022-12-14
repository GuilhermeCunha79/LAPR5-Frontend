import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../../message.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  public Url = 'http://localhost:3000/api/planning/';

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

  createPlanning(licensePlate: string, date: string, heuristic: string): Observable<any> {

    const body = {
      "licensePlate": licensePlate,
      "date": date,
      "heuristic": heuristic
    };

    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  createValidPlanning(licensePlate: string, date: string, heuristic: string): Observable<any> | null {
    if (!this.validateData( licensePlate, date, heuristic)) return null;

    return this.createPlanning( licensePlate, date, heuristic);
  }


  validateData( licensePlate: string, date: string, heuristic: string): boolean {


    if (licensePlate == null) {
      this.log("ERROR: Planning licensePlate can't be null.");
      return false;
    }

    if (date == null) {
      this.log("ERROR: Planning date can't be null.");
      return false;
    }

    if (heuristic == null) {
      this.log("ERROR: Planning heuristic can't be null.");
      return false;
    }

    return true;
  }

  log(message: string) {
    this.messageService.add(`Created: ${message}`);
  }
}
