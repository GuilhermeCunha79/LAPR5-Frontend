import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from "./shared.module";

import {AppComponent} from './app.component';
import {MessagesComponent} from './messages/messages.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {PageSignupComponent} from './page-signup/page-signup.component';
import {DefaultLayoutComponent} from './default-layout/default-layout.component';
import {HomepageComponent} from './homepage/homepage.component';
import {CreateDeliveryComponent} from './create-delivery/create-delivery.component';
import {CreatePlanningComponent} from './create-planning/create-planning.component';
import {CreateRouteComponent} from './create-route/create-route.component';
import {CreateTruckComponent} from './create-truck/create-truck.component';
import {CreateWarehouseComponent} from './create-warehouse/create-warehouse.component';
import {RoadNetworkComponent} from "./road-network/road-network.component";

import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from '@abacritt/angularx-social-login';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    SocialLoginModule
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    DefaultLayoutComponent,
    HomepageComponent,
    PageLoginComponent,
    PageSignupComponent,
    CreateDeliveryComponent,
    CreatePlanningComponent,
    CreateRouteComponent,
    CreateTruckComponent,
    CreateWarehouseComponent,
    RoadNetworkComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('130051265539-iqqg4sl2l1bum9t6ketuop7llr0tbltt.apps.googleusercontent.com')
          }
        ],
        onError: (err) => console.error(err)
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
