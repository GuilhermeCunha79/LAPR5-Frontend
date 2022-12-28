import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DeliveryComponent} from './create-delivery/create-delivery.component';
import {MessagesComponent} from './messages/messages.component';
import {CreateTruckComponent} from './create-truck/create-truck.component';
import {LoginComponent} from './login/login.component';
import {CreateWarehouseComponent} from './create-warehouse/create-warehouse.component';
import {CreateRouteComponent} from './create-route/create-route.component';
import {SharedModule} from "./shared.module";
import {CreatePlanningComponent} from './create-planning/create-planning.component';
import {RoadNetworkComponent} from "./road-network/road-network.component";
import {LoginScreenComponent} from './login-screen/login-screen.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    DeliveryComponent,
    MessagesComponent,
    CreateTruckComponent,
    CreateWarehouseComponent,
    CreateRouteComponent,
    CreatePlanningComponent,
    RoadNetworkComponent,
    LoginScreenComponent,
    DefaultLayoutComponent
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
