import { ErrorHandler, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { AppErrorHandler } from './core/error-handling/app-error-handler';
import { Header } from './core/layout/header/header';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [App, Header],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), { provide: ErrorHandler, useClass: AppErrorHandler },provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
