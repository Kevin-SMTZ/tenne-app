import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonItem, IonLabel, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cafeOutline, beerOutline, calendarOutline, timeOutline } from 'ionicons/icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonLabel, IonItem]
})

export class HomePage implements OnInit{
  private localStorageService = inject(LocalStorageService);
  nextEvent: any;
  constructor() {
    addIcons({timeOutline,calendarOutline,cafeOutline,beerOutline});
  }

  async ngOnInit() {
    const events = await this.localStorageService.get('cached_events');
    if (Array.isArray(events)) {
      const now = new Date();
      this.nextEvent = events
        .filter((e: any) => new Date(e.date) > now)
        .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    }
  }
}

