import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'proyecto-facturas-475d0',
        appId: '1:372357498281:web:85902b253654419df2b0b8',
        storageBucket: 'proyecto-facturas-475d0.firebasestorage.app',
        apiKey: 'AIzaSyDkNbrBIBekGwaUdoGOXIyHDepMhaB5zHQ',
        authDomain: 'proyecto-facturas-475d0.firebaseapp.com',
        messagingSenderId: '372357498281',
        measurementId: 'G-NBWN3ESHLE',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
