import { Injectable } from '@angular/core';

import { CartItem } from 'app/restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { MenuItem } from 'app/restaurants/restaurant-detail/menu-item/menu-item.model';

import { NotificationService } from './../../../shared/messages/notification.services';

@Injectable()
export class ShoppingCartService {

  items: CartItem[] = [];

  constructor(
    private notificationService: NotificationService
  ) {}

  clear() {
    
    this.items = [];
  }

  addItem(item: MenuItem){

    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);
    if (foundItem) {
      this.increaseQty(foundItem);
    } else {
      this.items.push(new CartItem(item));
    }

    this.notificationService.notify(`Você adicionou o item ${item.name}`);
  }

  removeItem(item: CartItem) {

    this.items.splice(this.items.indexOf(item), 1);

    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`);
  }

  total(): number {
    
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0);
  }

  increaseQty(item: CartItem) {
    
    item.quantity = item.quantity + 1;
  }
    
  decreaseQty(item: CartItem) {
    
    item.quantity = item.quantity - 1;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }
    
}