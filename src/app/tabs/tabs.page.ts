import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTitle, IonHeader, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { newspaperOutline, calendarOutline, readerOutline } from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonToolbar, IonHeader, IonTitle, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, HeaderComponent],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ newspaperOutline, calendarOutline, readerOutline });
  }
}
