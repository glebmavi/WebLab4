import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpRequestInterceptor} from "./_helpers/http.interceptor";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    importProvidersFrom(HttpClientModule),
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ]
};
