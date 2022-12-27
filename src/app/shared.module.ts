import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterPipe} from "./domain/filterPipe";
import {OrderPipe} from "./domain/orderPipe";
import {IdPipe} from "./domain/orderPipe1";

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [
    FilterPipe,
    OrderPipe,
    IdPipe
  ],

  providers: [],

  exports: [
    FilterPipe,
    OrderPipe,
    IdPipe
  ]
})

export class SharedModule {
}
