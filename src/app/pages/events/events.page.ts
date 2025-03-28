import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalNotifications } from '@capacitor/local-notifications';
import { IonHeader, IonIcon, IonButton, IonContent, IonTitle, IonToolbar, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';
import { EventNotificationService } from 'src/app/services/eventnotificationservice/event-notification.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonLabel, IonItem, IonCardHeader, IonCard, IonHeader, IonIcon, IonButton, IonContent, IonTitle, IonToolbar, CommonModule, IonIcon ]
})
export class EventsPage implements OnInit {
  events: any[] = [];
  reminderEventIds: Set<number> = new Set();

  constructor(
    private http: HttpClient,
    private notificationService: EventNotificationService
  ) {addIcons({heart,"heart-outline": heartOutline});}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('/assets/events.json').subscribe((data) => {
      this.events = data;
    });
  }

  toggleReminder(event: any) {
    if (this.reminderEventIds.has(event.id)) {
      this.reminderEventIds.delete(event.id);
      //this.notificationService.cancelEventNotification(event.id);
    } else {
      this.reminderEventIds.add(event.id);
      //this.notificationService.scheduleEventNotification(event);
    }
  }

  isEventReminderSet(event: any): boolean {
    return this.reminderEventIds.has(event.id);
  }
}