import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface EventItem {
  id: number;
  title: string;
  date: string; // ISO string
}

@Injectable({
  providedIn: 'root',
})
export class EventNotificationService {
  private eventsUrl = '/assets/data/events.json';

  init(){
    this.scheduleCheck();
  }

  constructor(private http: HttpClient) {
    this.scheduleCheck();
  }

  private scheduleCheck() {
    interval(60 * 60 * 1000) // jede Stunde
      .pipe(switchMap(() => this.http.get<EventItem[]>(this.eventsUrl)))
      .subscribe((events) => {
        const now = new Date();

        events.forEach((event) => {
          const eventDate = new Date(event.date);

          const oneDayBefore = new Date(eventDate);
          oneDayBefore.setDate(oneDayBefore.getDate() - 1);

          const oneHourBefore = new Date(eventDate);
          oneHourBefore.setHours(oneHourBefore.getHours() - 1);

          // Prüfen ob beide Zeiten in der Zukunft liegen
          if (oneDayBefore > now) {
            this.scheduleNotification(event, oneDayBefore, 'in 1 Tag');
          }

          if (oneHourBefore > now) {
            this.scheduleNotification(event, oneHourBefore, 'in 1 Stunde');
          }
        });
      });
  }

  private async scheduleNotification(event: EventItem, time: Date, when: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: event.id + time.getTime(),
          title: 'Tenne Event-Erinnerung',
          body: `"${event.title}" startet ${when}`,
          schedule: { at: time },
        },
      ],
    });
  }
}
