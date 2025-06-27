import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCard, IonCardContent, IonContent],
})
export class Home {
  constructor() {}
}
