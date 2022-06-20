import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login/login.component';
import { RegisterComponentComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AddAirlineComponent } from './add-airline/add-airline.component';
import { AirlineComponent } from './airline/airline.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component'
import { AirlineService } from './services/airlineService';
import { FlightBookService } from './services/flighBookService';
import { LoginService } from './services/loginServices';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceInterCeptor } from './services/login-interceptor';
import { UserHomeComponent } from './user-home/user-home.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { MyDateComponent } from './my-date/my-date.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { ToastrModule } from 'ngx-toastr';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import { TicketHistoryComponent } from './ticket-history/ticket-history.component';
import { SearchComponent } from './search/search.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    AddAirlineComponent,
    AirlineComponent,
    PageNotFoundComponent,
    HeaderComponent,
    HomeComponent,UserHomeComponent, AddInventoryComponent, MyDateComponent, InventoriesComponent, BookingTicketComponent, TicketHistoryComponent, SearchComponent, CouponComponent, CouponListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  
    ToastrModule
  ],
 
  providers: [AirlineService,FlightBookService,LoginService,{
    provide:HTTP_INTERCEPTORS,
    useClass:LoginServiceInterCeptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
