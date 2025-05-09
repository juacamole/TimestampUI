import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, provideEnvironmentInitializer, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { OAuthModule, OAuthStorage, AuthConfig } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptorsFromDi, withXsrfConfiguration } from '@angular/common/http';
import { AppAuthService } from './components/services/app.auth.service';
import { authConfig } from './app.auth';

import { routes } from './app.routes';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
        BrowserModule,
        OAuthModule.forRoot({ 
            resourceServer: { 
                sendAccessToken: true } 
            }
        ),
    ),
    { 
        provide: AuthConfig, 
        useValue: authConfig 
    },
    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },
    provideHttpClient(
      withInterceptorsFromDi(),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      })
    ),    
    provideEnvironmentInitializer(() => {
        inject(AppAuthService).initAuth().finally()}
    )
  ]
};
