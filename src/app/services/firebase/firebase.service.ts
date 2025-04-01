
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
} from '@angular/fire/firestore';
import { LocalStorageService } from '../localstorage/localstorage.service';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private localStorageService = inject(LocalStorageService);

  constructor() {}

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    const cacheKey = 'cached_events';
    const cacheTimestampKey = 'cached_events_timestamp';

    const cachedData = await this.localStorageService.get(cacheKey);
    const cachedTimestamp = await this.localStorageService.get(cacheTimestampKey);

    if (cachedData && cachedTimestamp) {
      const lastFetched = new Date(cachedTimestamp);
      const now = new Date();
      const diffInMs = now.getTime() - lastFetched.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours < 1) {
        return cachedData;
      }
    }

    const eventsCollection = collection(this.firestore, 'events');
    const q = query(eventsCollection, where('date', '>=', Timestamp.fromDate(now)), orderBy('date'));
    const querySnapshot = await getDocs(q);

    const events: Event[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        title: data['title'],
        description: data['description'],
        date: data['date'].toDate(),
      };
    });

    await this.localStorageService.set(cacheKey, events);
    await this.localStorageService.set(cacheTimestampKey, new Date().toISOString());
    return events;
  }
}