import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { ShoppingCartService } from './shopping-cart.service';

import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { MenuItem } from 'app/restaurants/restaurant-detail/menu-item/menu-item.model';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row', [
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([
        style({opcity: 0, transform: 'translateX(-30px)', offset: 0}),
        style({opcity: 0.8, transform: 'translateX(10px)', offset: 0.8}),
        style({opcity: 1, transform: 'translateX(0px)', offset: 1})
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([
        style({opcity: 1, transform: 'translateX(0px)', offset: 0}),
        style({opcity: 0.8, transform: 'translateX(-10px)', offset: 0.2}),
        style({opcity: 0, transform: 'translateX(30px)', offset: 1})
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready';

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  clear() {

    this.shoppingCartService.clear();
  }

  removeItem(item: CartItem) {

    this.shoppingCartService.removeItem(item);
  }

  addItem(item: MenuItem) {

    this.shoppingCartService.addItem(item);
  }

  items(): any[] {

    return this.shoppingCartService.items;
  }

  total(): number {

    return this.shoppingCartService.total();
  }

}
