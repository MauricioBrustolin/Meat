import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './../shared/shared.module';

import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';

import { LeaveOrderGuard } from './leave-order.guard';

const ROUTES: Routes = [
  { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent
  ],
  exports: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent    
  ]
})
export class OrderModule { }
