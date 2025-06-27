import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  imports: [IonButton, IonCardContent, IonCard, IonContent, HeaderComponent],
})
export class Contact {
  constructor() {}
}
