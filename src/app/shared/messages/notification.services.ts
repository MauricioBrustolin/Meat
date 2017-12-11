import { EventEmitter } from '@angular/core';

export class NotificationService {

  notifier = new EventEmitter<string>();
  loader = new EventEmitter<boolean>();

  notify(message: string) {

    this.notifier.emit(message);
  }

  loading(show: boolean) {

    this.loader.emit(show);
  }

}