import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, IonIcon, IonCardTitle, IonCardHeader, IonCard, IonCardSubtitle } from '@ionic/angular/standalone';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: true,
  imports: [HttpClientModule, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class EventsPage implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('assets/events.json').subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Events:', err);
      },
    });
  }
}
