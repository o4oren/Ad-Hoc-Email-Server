import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  providers: [{provide: APP_BASE_HREF, useValue: 'http://localhost:3000'}],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
