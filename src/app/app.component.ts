import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { EventNotificationService } from './services/eventnotificationservice/event-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  private notificationService = inject(EventNotificationService); // ← Service wird geladen

  constructor() {}

  ngOnInit() {
    this.notificationService.init();
  }

}
