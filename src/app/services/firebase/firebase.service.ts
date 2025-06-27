import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, Firestore, Timestamp } from '@angular/fire/firestore';
import { LocalStorageService } from '../localstorage/local-storage.service';

@Injectable({ providedIn: 'root' })

export class FirebaseService {
  constructor(private firestore: Firestore, private localStorage: LocalStorageService) {}

  async loadUpcomingEvents() {
    const eventsRef = collection(this.firestore, 'events');
    const q = query(eventsRef, where('date', '>=', Timestamp.fromDate(new Date())));

    const querySnapshot = await getDocs(q);

    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Events offline speichern
    this.localStorage.set('events', events);

    return events;
  }

  getEventsFromStorage() {
    return this.localStorage.get('events');
  }
}
