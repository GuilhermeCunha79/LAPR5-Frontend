import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
})

@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], domainType: string, params: any, listSize?: number, pageNumber?: number): any[] {

    if (!items) {
      return [];
    }

    let finalList = JSON.parse(JSON.stringify(items)) as any[];

    if (domainType === "delivery") {

      if (!params.deliveryIdentifier && !params.day && !params.month && !params.year && !params.mass && !params.storeId && !params.withdrawalTime && !params.placingTime) {
        return items;
      }

      if (params.deliveryIdentifier) {
        finalList = finalList.filter((singleItem) =>
          singleItem['deliveryIdentifier'].toLowerCase().includes(params.deliveryIdentifier.toLowerCase())
        );
      }

      if (params.day) {
        finalList = finalList.filter((singleItem) =>
          singleItem['day'].toString().toLowerCase().includes(params.day.toLowerCase())
        );
      }

      if (params.month) {
        finalList = finalList.filter((singleItem) =>
          singleItem['month'].toLowerCase().includes(params.month.toLowerCase())
        );
      }

      if (params.year) {
        finalList = finalList.filter((singleItem) =>
          singleItem['year'].toString().toLowerCase().includes(params.year.toLowerCase())
        );
      }

      if (params.mass) {
        finalList = finalList.filter((singleItem) =>
          singleItem['mass'].toString().toLowerCase().includes(params.mass.toLowerCase())
        );
      }

      if (params.withdrawalTime) {
        finalList = finalList.filter((singleItem) =>
          singleItem['withdrawalTime'].toString().toLowerCase().includes(params.withdrawalTime.toLowerCase())
        );
      }

      if (params.storeId) {
        finalList = finalList.filter((singleItem) =>
          singleItem['storeId'].toString().toLowerCase().includes(params.storeId.toLowerCase())
        );
      }

      if (params.placingTime) {
        finalList = finalList.filter((singleItem) =>
          singleItem['placingTime'].toString().toLowerCase().includes(params.placingTime.toLowerCase())
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
      if (!params.warehouseIdentifier && !params.designation && !params.street && !params.number && !params.postalCode && !params.country && !params.latitude && !params.longitude && !params.altitude) {
        return items;
      }

      if (params.warehouseIdentifier) {
        finalList = finalList.filter((singleItem) =>
          singleItem['warehouseIdentifier'].toLowerCase().includes(params.warehouseIdentifier.toLowerCase())
        );
      }

      if (params.designation) {
        finalList = finalList.filter((singleItem) =>
          singleItem['designation'].toString().toLowerCase().includes(params.designation.toLowerCase())
        );
      }

      if (params.street) {
        finalList = finalList.filter((singleItem) =>
          singleItem['street'].toString().toLowerCase().includes(params.street.toLowerCase())
        );
      }

      if (params.number) {
        finalList = finalList.filter((singleItem) =>
          singleItem['number'].toString().toLowerCase().includes(params.number.toLowerCase())
        );
      }

      if (params.postalCode) {
        finalList = finalList.filter((singleItem) =>
          singleItem['postalCode'].toString().toLowerCase().includes(params.postalCode.toLowerCase())
        );
      }

      if (params.country) {
        finalList = finalList.filter((singleItem) =>
          singleItem['country'].toString().toLowerCase().includes(params.country.toLowerCase())
        );
      }
      if (params.latitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['latitude'].toString().toLowerCase().includes(params.latitude.toLowerCase())
        );
      }
      if (params.longitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['longitude'].toString().toLowerCase().includes(params.longitude.toLowerCase())
        );
      }
      if (params.altitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['altitude'].toString().toLowerCase().includes(params.altitude.toLowerCase())
        );
      }
    } else if (domainType === "route") {

      if (!params.routeId && !params.origin && !params.destination && !params.distance && !params.timeDistance && !params.energySpent && !params.extraBatteryTime && !listSize && !pageNumber) {
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

      if (listSize && pageNumber) {
        finalList = this.sliceArray(finalList, listSize, pageNumber)
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
      if (!params.warehouseIdentifier && !params.designation && !params.street && !params.number && !params.postalCode && !params.country && !params.latitude && !params.longitude && !params.altitude && !params.status) {
        return items;
      }

      if (params.warehouseIdentifier) {
        finalList = finalList.filter((singleItem) =>
          singleItem['warehouseIdentifier'].toLowerCase().includes(params.warehouseIdentifier.toLowerCase())
        );
      }

      if (params.designation) {
        finalList = finalList.filter((singleItem) =>
          singleItem['designation'].toString().toLowerCase().includes(params.designation.toLowerCase())
        );
      }

      if (params.street) {
        finalList = finalList.filter((singleItem) =>
          singleItem['street'].toString().toLowerCase().includes(params.street.toLowerCase())
        );
      }

      if (params.number) {
        finalList = finalList.filter((singleItem) =>
          singleItem['number'].toString().toLowerCase().includes(params.number.toLowerCase())
        );
      }

      if (params.postalCode) {
        finalList = finalList.filter((singleItem) =>
          singleItem['postalCode'].toString().toLowerCase().includes(params.postalCode.toLowerCase())
        );
      }

      if (params.country) {
        finalList = finalList.filter((singleItem) =>
          singleItem['country'].toString().toLowerCase().includes(params.country.toLowerCase())
        );
      }
      if (params.latitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['latitude'].toString().toLowerCase().includes(params.latitude.toLowerCase())
        );
      }
      if (params.longitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['longitude'].toString().toLowerCase().includes(params.longitude.toLowerCase())
        );
      }
      if (params.altitude) {
        finalList = finalList.filter((singleItem) =>
          singleItem['altitude'].toString().toLowerCase().includes(params.altitude.toLowerCase())
        );
      }
      if (params.status) {
        finalList = finalList.filter((singleItem) =>
          singleItem['status'].toString().toLowerCase().includes(params.status.toLowerCase())
        );
      }
    } else if (domainType === "planning") {

      if (!params.licensePlate && !params.date && !params.warehouse) {
        return items;
      }

      if (params.licensePlate) {
        finalList = finalList.filter((singleItem) =>
          singleItem['licensePlate'].toLowerCase().includes(params.licensePlate.toLowerCase())
        );
      }
      if (params.date) {
        finalList = finalList.filter((singleItem) =>
          singleItem['date'].toLowerCase().includes(params.date.toLowerCase())
        );
      }
      if (params.warehouse) {
        finalList = finalList.filter((singleItem) =>
          singleItem['warehouse'].toLowerCase().includes(params.warehouse.toLowerCase())
        );
      }
    }

    return finalList;
  }

  sliceArray(items: any[], listSize: number, pageNumber: number) {
    if (listSize*(pageNumber-1) > items.length) {
      return items;
    }

    const offset = listSize*pageNumber > items.length ? listSize*pageNumber-items.length : 0;
    return items.slice(listSize*(pageNumber-1), (listSize*pageNumber)-offset);
  }
}
