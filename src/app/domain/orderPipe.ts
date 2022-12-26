import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "orderBy"
})
export class OrderPipe implements PipeTransform {

  transform(array: any, day: any, month: any, year: any): any[] {
    let arr = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    array.sort((a: any, b: any) => {

      if (a[day] > b[day]) {
        return -1;
      } else if (a[day] < b[day]) {
        return 1;
      } else {
        return 0;
      }

    });

    array.sort((a: any, b: any) => {
      let indA = arr.indexOf(a[month].toUpperCase());
      let indB = arr.indexOf(b[month].toUpperCase());

      if (indA > indB) {
        return -1;
      } else if (indA < indB) {
        return 1;
      } else {
        return 0;
      }

    });

    array.sort((a: any, b: any) => {

      if (a[year] > b[year]) {
        return -1;
      } else if (a[year] < b[year]) {
        return 1;
      } else {
        return 0;
      }

    });
    return array;

  }


}



