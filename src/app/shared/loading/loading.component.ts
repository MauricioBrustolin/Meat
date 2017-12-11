import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { NotificationService } from 'app/shared/messages/notification.services';

@Component({
  selector: 'mt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [
    trigger('spinner-visibility', [
      state('hidden', style({
        opacity: 0,
        "display":"none",
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        "display":"block",
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class LoadingComponent implements OnInit {

  spinnerVisibility: string = 'hidden';
  
  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

    this.notificationService.loader.subscribe(show => {
      if (show === true) {
        this.spinnerVisibility = 'visible'      
      } else {
        this.spinnerVisibility = 'hidden'      
      }
    })
  }

}
