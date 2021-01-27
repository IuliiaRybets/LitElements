import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CacheInterceptor } from '@core/interceptors/cache.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { SharedModule } from '@shared/shared.module';
import { SpinnerOverlayModule } from '@shared/spinner-overlay/spinner-overlay.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackingModule } from './tracking/tracking.module';
import { GlobalErrorHandler } from '@core/global.errorhandler';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    SpinnerOverlayModule,
    SharedModule,
    HttpClientModule,
    TrackingModule.forRoot({
      produktname: 'Hausratversicherung',
      produktId: '1080100',
      produktKategorie: 'Bauen + Wohnen',
      vertragslaufzeit: '1 Jahr',
      portalId: 'e01e3cebb884dd2557b35bd40da770e5'
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
