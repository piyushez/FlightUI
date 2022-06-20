import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { AirlineComponent } from './airline/airline.component';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { CouponComponent } from './coupon/coupon.component';

import { HomeComponent } from './home/home.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { LoginComponentComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponentComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
{path:'',  component:HomeComponent },
{path:'home',  component:HomeComponent },
  { path:'login',component:LoginComponentComponent},
  {path:'addairline',component:AddAirlineComponent },
  {
    path:'register',
    component:RegisterComponentComponent
  },
  {
    path:'airlines',
    component:AirlineComponent
  }, 
  {
    path:'userHome',
    component:UserHomeComponent
  },
  {
    path:'bookingTicket',
    component:BookingTicketComponent
  },
  {
    path:'coupons',
    component:CouponListComponent
  },
  {
    path:'addInventory',
    component:AddInventoryComponent
  },
  {
    path:'addCoupon',
    component:CouponComponent
  },
  {
    path:'searchUser',
    component:SearchComponent
  },
  {
    path:'updateInventory/:id',
    component:AddInventoryComponent
  },
  {
    path:'inventories',
    component:InventoriesComponent
  },
  {
    path:'tickethistory',
    component:TicketHistoryComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
