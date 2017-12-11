import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/do';

import { OrderService } from './order.service';

import { RadioOption } from './../shared/radio/radio-option.model';
import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from 'app/order/order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de débito', value: 'DEB' },
    { label: 'Vale refeição', value: 'REF' }
  ];

  delivery: number = 8;

  orderId: string;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPatern = /^[0-9]*$/;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      emailConfirmation: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      number: ['', [Validators.required, Validators.pattern(this.numberPatern)]],
      optionalAddress: '',
      paymentOption: ['', [Validators.required]]
    }, {validator: OrderComponent.equalsTo})
  }

  static equalsTo(group: AbstractControl): { [key:string]: boolean } {
    
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true}
    }
    return undefined;
  };

  itemsValue(): number {

    return this.orderService.itemsValue();
  }

  cartItems() {

    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {

    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {

    this.orderService.remove(item);
  }

  checkOrder(order: Order) {

    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)); 
    
    this.orderService.checkOrder(order)
      .do((orderId: string) => {
        this.orderId = orderId
      })
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary']);
        this.orderService.clear();
      });
  }

  isOrderCompleted(): boolean {

    return this.orderId !== undefined;
  }
}
