import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss'],
  imports: [ IonicModule, CommonModule, HeaderComponent],
})

export class Events implements OnInit {
  events: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    console.log('EventsPage geladen – starte Event-Abfrage');
    try {
      this.events = await this.firebaseService.loadUpcomingEvents();
      console.log('Events erfolgreich aus Firestore geladen:', this.events);
    } catch (error) {
      console.error('Fehler beim Laden aus Firestore, wechsle zu Offline-Daten:', error);
      this.events = this.firebaseService.getEventsFromStorage() || [];
      console.log('Offline-Events aus LocalStorage:', this.events);
    }
  }
}
