import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private Url = 'https://localhost:5001/api/Delivery';

  constructor(private httpClient: HttpClient) {
  }

  getDeliveries(): Observable<any> {
    return this.httpClient.get(this.Url).pipe(
      map(this.extractData));
  }

  getDeliveryByIdentifier(deliveryIdentifier: string): Observable<any> {
    return this.httpClient.get(this.Url + '/ByIdentifier/' + deliveryIdentifier).pipe(
      map(this.extractData));
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
}
