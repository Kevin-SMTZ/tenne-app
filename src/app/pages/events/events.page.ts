import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonIcon, IonButton, IonContent, IonTitle, IonToolbar, IonCard, IonCardHeader, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { heartOutline, heart } from 'ionicons/icons';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { LocalStorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonCardContent, IonContent, IonCardHeader, IonCard, IonHeader, IonTitle, IonToolbar, CommonModule ],
})
export class EventsPage implements OnInit {
  private localStorage = inject(LocalStorageService);

  events: any[] = [];


  constructor() {}

  async ngOnInit() {
    const cachedEvents = await this.localStorage.get('cached_events');
    this.events = cachedEvents || [];
  }

}