import { ErrorHandler, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { AppErrorHandler } from './core/error-handling/app-error-handler';
import { Header } from './core/layout/header/header';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { httpErrorInterceptor } from './core/error-handling/http-error.interceptor';

@NgModule({
  declarations: [App, Header],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
