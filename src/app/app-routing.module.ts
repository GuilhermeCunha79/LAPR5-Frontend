import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageLoginComponent} from "./page-login/page-login.component";
import {PageSignupComponent} from "./page-signup/page-signup.component";
import {DefaultLayoutComponent} from "./default-layout/default-layout.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {CreateDeliveryComponent} from "./create-delivery/create-delivery.component";
import {CreatePlanningComponent} from "./create-planning/create-planning.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {CreateTruckComponent} from "./create-truck/create-truck.component";
import {CreateWarehouseComponent} from "./create-warehouse/create-warehouse.component";
import {RoadNetworkComponent} from "./road-network/road-network.component";
import {TermsOfUseComponent} from "./terms-of-use/terms-of-use.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {UsersComponent} from "./users/users.component";
import {SimComponent} from "./sim/sim.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: PageLoginComponent},
  {path: 'signup', component: PageSignupComponent},

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
      {path: 'terms-of-use', component: TermsOfUseComponent},
      {path: 'privacy-policy', component: PrivacyPolicyComponent},
      {path: 'road-network', component: RoadNetworkComponent},
      {path: 'user', component: UsersComponent},
      {path: 'sim', component: SimComponent}
    ]
  },

  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
