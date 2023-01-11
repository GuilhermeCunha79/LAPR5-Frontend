import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPipe} from "./domain/filterPipe";
import {OrderPipe} from "./domain/orderPipe";
import {IdPipe} from "./domain/orderPipe1";
import {DayPipe} from "./domain/orderPipe2";

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    FilterPipe,
    OrderPipe,
    IdPipe,
    DayPipe
  ],

  providers: [],

  exports: [
    FilterPipe,
    OrderPipe,
    IdPipe,
    DayPipe
  ]
})

export class SharedModule {
}
