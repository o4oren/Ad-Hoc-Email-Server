import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, Inject, APP_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { isPlatformBrowser, APP_BASE_HREF } from '@angular/common';
import {CoreModule} from './core/core.module';
import {Angulartics2Module} from 'angulartics2';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ahem' }),
    CoreModule,
    Angulartics2Module.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);  }
}
