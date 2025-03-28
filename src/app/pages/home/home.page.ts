import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonItem, IonLabel, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cafeOutline, beerOutline, calendarOutline, timeOutline } from 'ionicons/icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonIcon, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, HttpClientModule]
})

export class HomePage implements OnInit{
  private http = inject(HttpClient);

  nextEvent: any = null;

  constructor() {
    addIcons({timeOutline,calendarOutline,cafeOutline,beerOutline});
    this.loadNextEvent();
  }
  ngOnInit(){ }

  loadNextEvent() {
    this.http.get<any[]>('assets/events.json').subscribe((events) => {
      const now = new Date();
  
      const upcoming = events
        .map((event) => ({
          ...event,
          dateObj: new Date(event.date),
        }))
        .filter((e) => e.dateObj >= now)
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());
  
      this.nextEvent = upcoming[0] || null;
    });
  }
}

