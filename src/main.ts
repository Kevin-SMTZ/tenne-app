import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeDe);


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(HttpClientModule), // ✅ HINZUFÜGEN
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
  ],
});
