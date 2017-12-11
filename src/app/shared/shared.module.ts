import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingCartService } from 'app/restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { OrderService } from './../order/order.service';
import { NotificationService } from './messages/notification.services';
import { LoginService } from 'app/security/login/login.service';

import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { LoadingComponent } from './loading/loading.component';
import { LoggedInGuard } from 'app/security/loggedin.guard';
import { LeaveOrderGuard } from './../order/leave-order.guard';
import { AuthInterceptor } from './../security/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InputComponent,
    RadioComponent,
    RatingComponent,
    SnackbarComponent,
    LoadingComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    RadioComponent,
    RatingComponent,
    SnackbarComponent,
    LoadingComponent
  ]
})
export class SharedModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService,
        NotificationService,
        LoginService,
        LoggedInGuard,
        LeaveOrderGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    }
  }
}
