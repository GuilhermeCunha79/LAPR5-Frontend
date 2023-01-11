import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "orderBy1"
})
export class DayPipe implements PipeTransform {

  transform(array: any, day: any): any[] {

    array.sort((a: any, b: any) => {

      if (a[day] > b[day]) {
        return -1;
      } else if (a[day] < b[day]) {
        return 1;
      } else {
        return 0;
      }

    });


    return array;

  }


}



