import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginScreenComponent} from "./page-login/login-screen.component";
import {SignupScreenComponent} from "./page-signup/signup-screen.component";
import {DefaultLayoutComponent} from "./default-layout/default-layout.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CreateDeliveryComponent} from "./create-delivery/create-delivery.component";
import {CreatePlanningComponent} from "./create-planning/create-planning.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {CreateTruckComponent} from "./create-truck/create-truck.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {RoadNetworkComponent} from "./road-network/road-network.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'login', component: LoginScreenComponent},
  {path: 'signup', component: SignupScreenComponent},

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: 'home', component: HomepageComponent},

      {path: 'delivery', component: CreateDeliveryComponent},
      {path: 'planning', component: CreatePlanningComponent},
      {path: 'route', component: CreateRouteComponent},
      {path: 'truck', component: CreateTruckComponent},
      {path: 'warehouse', component: CreateWarehouseComponent},

      {path: 'road-network', component: RoadNetworkComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
