import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NotificationService } from './services/notificationservice/notification.service';
import { LocalStorageService } from './services/localstorage/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  //private notificationService = inject(EventNotificationService);
  private FirebaseService = inject(FirebaseService);
  private localStorage = inject(LocalStorageService);
  private notificationService = inject(NotificationService);

  constructor() {}

  async ngOnInit() {
    await this.localStorage.init();

    const result = await this.FirebaseService.getUpcomingEvents();


    const cachedEvents = await this.localStorage.get('cached_events');
    console.log("Result Events: ", result);
    console.log("Events: ", cachedEvents);
    

    if (cachedEvents && Array.isArray(cachedEvents)) {
      this.notificationService.scheduleEventNotifications(cachedEvents);
    } else {
      //console.log('⚠️ Keine gespeicherten Events im LocalStorage gefunden.'); ///Nur zum Testen
    }
  }

}
