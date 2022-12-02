import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], domainType: string, params: any): any[] {

    if (!items) {
      return [];
    }

    let finalList = JSON.parse(JSON.stringify(items)) as any[];

    if (domainType === "delivery") {

      //TODO
    } else if (domainType === "route") {

      if (!params.routeId && !params.origin && !params.destination && !params.distance && !params.timeDistance && !params.energySpent && !params.extraBatteryTime) {
        return items;
      }

      if (params.routeId) {
        finalList = finalList.filter((singleItem) =>
          singleItem['routeId'].toLowerCase().includes(params.routeId.toLowerCase())
        );
      }

      if (params.origin) {
        finalList = finalList.filter((singleItem) =>
          singleItem['origin'].toLowerCase().includes(params.origin.toLowerCase())
        );
      }

      if (params.destination) {
        finalList = finalList.filter((singleItem) =>
          singleItem['destination'].toLowerCase().includes(params.destination.toLowerCase())
        );
      }

      if (params.distance) {
        finalList = finalList.filter((singleItem) =>
          singleItem['distance'].toString().toLowerCase().includes(params.distance.toLowerCase())
        );
      }

      if (params.timeDistance) {
        finalList = finalList.filter((singleItem) =>
          singleItem['timeDistance'].toString().toLowerCase().includes(params.timeDistance.toLowerCase())
        );
      }

      if (params.energySpent) {
        finalList = finalList.filter((singleItem) =>
          singleItem['energySpent'].toString().toLowerCase().includes(params.energySpent.toLowerCase())
        );
      }

      if (params.extraBatteryTime) {
        finalList = finalList.filter((singleItem) =>
          singleItem['extraBatteryTime'].toString().toLowerCase().includes(params.extraBatteryTime.toLowerCase())
        );
      }
    } else if (domainType === "truck") {

      if (!params.licensePlate && !params.autonomy && !params.capacityCargo && !params.capacityTransportation && !params.battery && !params.tare) {
        return items;
      }

      if (params.licensePlate) {
        finalList = finalList.filter((singleItem) =>
          singleItem['licensePlate'].toLowerCase().includes(params.licensePlate.toLowerCase())
        );
      }

      if (params.autonomy) {
        finalList = finalList.filter((singleItem) =>
          singleItem['autonomy'].toString().toLowerCase().includes(params.autonomy.toLowerCase())
        );
      }

      if (params.capacityCargo) {
        finalList = finalList.filter((singleItem) =>
          singleItem['capacityCargo'].toString().toLowerCase().includes(params.capacityCargo.toLowerCase())
        );
      }

      if (params.capacityTransportation) {
        finalList = finalList.filter((singleItem) =>
          singleItem['capacityTransportation'].toString().toLowerCase().includes(params.capacityTransportation.toLowerCase())
        );
      }

      if (params.battery) {
        finalList = finalList.filter((singleItem) =>
          singleItem['battery'].toString().toLowerCase().includes(params.battery.toLowerCase())
        );
      }

      if (params.tare) {
        finalList = finalList.filter((singleItem) =>
          singleItem['tare'].toString().toLowerCase().includes(params.tare.toLowerCase())
        );
      }
    } else if (domainType === "warehouse") {

      //TODO
    }

    return finalList;
  }
}
