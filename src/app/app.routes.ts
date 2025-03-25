import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.page').then( m => m.EventsPage)
  },
  {
    path: 'menue',
    loadComponent: () => import('./pages/menue/menue.page').then( m => m.MenuePage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then( m => m.ContactPage)
  },
];
