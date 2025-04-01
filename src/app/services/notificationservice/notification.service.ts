import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    this.init();
  }

  async init() {
    const permission = await LocalNotifications.requestPermissions();
    if (permission.display !== 'granted') {
      console.warn('Benachrichtigungen wurden nicht erlaubt.');
    }
  }

  async scheduleEventNotifications(events: { id: string; title: string; date: Date }[]) {
    for (const event of events) {
      await this.scheduleSingleNotification(event);
    }
  }

  private async scheduleSingleNotification(event: { id: string; title: string; date: Date }) {
    const eventDate = new Date(event.date);

    const oneDayBefore = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
    const oneHourBefore = new Date(eventDate.getTime() - 60 * 60 * 1000);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: Number(event.id + '1'),
          title: 'Erinnerung: ' + event.title,
          body: 'Morgen ist das Event!',
          schedule: { at: oneDayBefore },
        },
        {
          id: Number(event.id + '2'),
          title: 'Nicht vergessen: ' + event.title,
          body: 'In einer Stunde geht es los!',
          schedule: { at: oneHourBefore },
        },
      ],
    });
  }

  async cancelAllNotifications() {
    await LocalNotifications.cancel({ notifications: [] });
  }
}
