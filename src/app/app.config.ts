import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { CartState } from './store/cart/cart.state';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { notFoundInterceptor } from './core/interceptors/notFound.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes,withComponentInputBinding()),
    provideHttpClient(withInterceptors([notFoundInterceptor]),withFetch()),
    provideStore(
    [CartState],
    withNgxsReduxDevtoolsPlugin(),
    withNgxsRouterPlugin(),
    withNgxsStoragePlugin({
            keys: '*'
          })
), provideClientHydration(withEventReplay())
  ]
};
