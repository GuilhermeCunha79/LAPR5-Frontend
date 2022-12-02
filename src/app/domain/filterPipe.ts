import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], licensePlate: string, autonomy: string, capacityCargo: string, capacityTransportation: string, battery: string, tare: string): any[] {

    if (!items) {
      return [];
    }

    if (!licensePlate && !autonomy && !capacityCargo && !capacityTransportation && !battery && !tare) {
      return items;
    }

    let finalList = JSON.parse(JSON.stringify(items)) as any[];

    if (licensePlate) {
      finalList = finalList.filter((singleItem) =>
        singleItem['licensePlate'].toLowerCase().includes(licensePlate.toLowerCase())
      );
    }

    if (autonomy) {
      finalList = finalList.filter((singleItem) =>
        singleItem['autonomy'].toString().toLowerCase().includes(autonomy.toLowerCase())
      );
    }

    if (capacityCargo) {
      finalList = finalList.filter((singleItem) =>
        singleItem['capacityCargo'].toString().toLowerCase().includes(capacityCargo.toLowerCase())
      );
    }

    if (capacityTransportation) {
      finalList = finalList.filter((singleItem) =>
        singleItem['capacityTransportation'].toString().toLowerCase().includes(capacityTransportation.toLowerCase())
      );
    }

    if (battery) {
      finalList = finalList.filter((singleItem) =>
        singleItem['battery'].toString().toLowerCase().includes(battery.toLowerCase())
      );
    }

    if (tare) {
      finalList = finalList.filter((singleItem) =>
        singleItem['tare'].toString().toLowerCase().includes(tare.toLowerCase())
      );
    }

    return finalList;
  }
}
