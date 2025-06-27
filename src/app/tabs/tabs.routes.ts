import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home/home.page').then((m) => m.Home),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('../pages/events/events.page').then((m) => m.Events),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('../pages/contact/contact.page').then((m) => m.Contact),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
