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
          id: this.createNumericId(event.id, 1),
          title: 'Erinnerung: ' + event.title,
          body: 'Morgen ist das Event!',
          schedule: { at: oneDayBefore },
        },
        {
          id: this.createNumericId(event.id, 2),
          title: 'Nicht vergessen: ' + event.title,
          body: 'In einer Stunde geht es los!',
          schedule: { at: oneHourBefore },
        },
      ],
    });
  }

  private createNumericId(id: string, offset: number): number {
    let hash = 0;
    for (const char of id) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) * 10 + offset;
  }

  async cancelAllNotifications() {
    await LocalNotifications.cancel({ notifications: [] });
  }
}
