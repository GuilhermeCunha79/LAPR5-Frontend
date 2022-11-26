import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DeliveryComponent} from "./Delivery/delivery.component";
import {DeliveryDetailComponent} from "./delivery-detail/delivery-detail.component";
import {LoginComponent} from "./login/login.component";
import {WarehouseManagerComponent} from "./warehouse-manager/warehouse-manager.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {RouteComponent} from "./create-route/route.component";
import {CreateTruckComponent} from "./create-truck/create-truck.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: '', redirectTo: '/delivery', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  {path: 'warehouse-manager', component: WarehouseManagerComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'detail/:id', component: DeliveryDetailComponent},
  {path: 'deliveries', component: DeliveryComponent},

  {path: 'create-route', component: RouteComponent},
  {path: 'create-truck', component: CreateTruckComponent},
  {path: 'create-warehouse', component: CreateWarehouseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
