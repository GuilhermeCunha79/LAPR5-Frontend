import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {MessageService} from "../../message.service";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  public Url = 'https://localhost:5001/api/Delivery';

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  log(message: string) {
    this.messageService.add(`Created Delivery: ${message}`);
  }

  getDeliveries(): Observable<any> {
    return this.httpClient.get(this.Url).pipe(
      map(this.extractData));
  }

  getDeliveryByIdentifier(deliveryIdentifier: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByIdentifier/' + deliveryIdentifier).pipe(
      map(this.extractData));
  }

  createValidDelivery(deliveryIdentifier: string, day: number, month: string, year: number, mass: number, placingTime: number, wId: string,withdrawalTime: number): Observable<any> | null {
    if (this.validateData(deliveryIdentifier, day, month, year, mass, placingTime, wId, withdrawalTime)) {
      return this.createDelivery(deliveryIdentifier, day, month, year, mass, placingTime, wId, withdrawalTime);
    } else return null;
  }

  createDelivery(deliveryIdentifier: string, day: number, month: string, year: number, mass: number, placingTime: number, wId: string,withdrawalTime: number): Observable<any> {
    const body = {
      "deliveryIdentifier": deliveryIdentifier,
      "day": day,
      "month": month,
      "year": year,
      "mass": mass,
      "placingTime": placingTime,
      "storeId": wId,
      "withdrawalTime": withdrawalTime
    };
    return this.httpClient.post(this.Url, body).pipe(map(this.extractData));
  }

  updateDelivery(deliveryIdentifier: string, day: number, month: string, year: number, mass: number, wId: string, withdrawalTime: number, placingTime: number): Observable<any> {
    const body = {
      "deliveryIdentifier": deliveryIdentifier,
      "day": day,
      "month": month,
      "year": year,
      "mass": mass,
      "placingTime": placingTime,
      "storeId": wId,
      "withdrawalTime": withdrawalTime
    };
    console.log(body);
    return this.httpClient.put(this.Url + '/ByIdentifier' + deliveryIdentifier, body)
      .pipe(map(this.extractData)
      );
  }

  public extractData(res: any) {
    return res || {};
  }


  listTable(): void {

    let tbody = document.getElementById('tbody') as HTMLTableElement;

    let array = this.getDeliveries();
    console.log(array);

    array.forEach(function (i) {


      console.log(i.length)

      for (let j = 0; j < i.length; j++) {
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_day = tr.insertCell();
        let td_month = tr.insertCell();
        let td_year = tr.insertCell();
        let td_mass = tr.insertCell();
        let td_placingTime = tr.insertCell();
        let td_storeId = tr.insertCell();
        let td_withdrawalTime = tr.insertCell();

        td_id.innerText = i[j].deliveryIdentifier;
        td_day.innerText = i[j].day;
        td_month.innerText = i[j].month;
        td_year.innerText = i[j].year;
        td_mass.innerText = i[j].mass;
        td_placingTime.innerText = i[j].placingTime;
        td_storeId.innerText = i[j].storeId;
        td_withdrawalTime.innerText = i[j].withdrawalTime;

      }
    });
  }

  validateData(deliveryIdentifier: string, day: number, month: string, year: number, mass: number, placingTime: number, wId: string,withdrawalTime: number): boolean {
    let months: string[];
    months = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY", "AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

    let flag: boolean = true;

    if (deliveryIdentifier == null) {
      this.log("ERROR: Delivery Identifier must be inserted");
      flag = false;
    }

    if (day <=0  || day>31) {
      this.log("ERROR: Delivery day must be inserted correctly");
      flag = false;
    }

    if (!months.includes(month.toUpperCase())) {
      this.log("ERROR: Insert a valid month.");
      flag = false;
    }

    if (year <0) {
      this.log("ERROR: Delivery year must be correctly");
      flag = false;
    }
    if (mass >0) {
      this.log("ERROR: Mass cannot be less then 0.");
      flag = false;
    }

    if (wId == null) {
      this.log("ERROR: Warehouse ID to deliver must be inserted");
      flag = false;
    }
    if (withdrawalTime == null) {
      this.log("ERROR: Withdrawal time must be inserted");
      flag = false;
    }
    if (placingTime == null) {
      this.log("ERROR: Placing time must be inserted");
      flag = false;
    }
    return flag;


  }
}
