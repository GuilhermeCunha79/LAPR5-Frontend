import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DeliveryComponent} from "./create-delivery/create-delivery.component";
import {LoginComponent} from "./login/login.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {CreateTruckComponent} from "./create-truck/create-truck.component";
import {CreatePlanningComponent} from "./create-planning/create-planning.component";
import {RoadNetworkComponent} from "./road-network/road-network.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {DefaultLayoutComponent} from "./default-layout/default-layout.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: 'login', component: LoginScreenComponent},

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {path: 'home', component: LoginComponent},

      {path: 'delivery', component: DeliveryComponent},
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
