import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from "./shared.module";

import {AppComponent} from './app.component';
import {MessagesComponent} from './messages/messages.component';
import {LoginScreenComponent} from './page-login/login-screen.component';
import {SignupScreenComponent} from './page-signup/signup-screen.component';
import {DefaultLayoutComponent} from './default-layout/default-layout.component';
import {HomepageComponent} from './homepage/homepage.component';
import {CreateDeliveryComponent} from './create-delivery/create-delivery.component';
import {CreatePlanningComponent} from './create-planning/create-planning.component';
import {CreateRouteComponent} from './create-route/create-route.component';
import {CreateTruckComponent} from './create-truck/create-truck.component';
import {CreateWarehouseComponent} from './create-warehouse/create-warehouse.component';
import {RoadNetworkComponent} from "./road-network/road-network.component";

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
    MessagesComponent,
    DefaultLayoutComponent,
    HomepageComponent,
    LoginScreenComponent,
    SignupScreenComponent,
    CreateDeliveryComponent,
    CreatePlanningComponent,
    CreateRouteComponent,
    CreateTruckComponent,
    CreateWarehouseComponent,
    RoadNetworkComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
