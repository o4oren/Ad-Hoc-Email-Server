import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatExpansionModule,
  MatIconModule, MatIconRegistry,
  MatInputModule,
  MatListModule, MatSidenavModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {CoreRoutingModule} from './core-routing.module';
import {MomentModule} from 'angular2-moment';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';
import {Angulartics2Module} from 'angulartics2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ApiDocumentationComponent} from '../api-documentation/api-documentation.component';
import {DeviceService} from './services/device.service';
import {ApiService} from './services/api.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTrash, faDove, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faMeh, faEnvelope, faEnvelopeOpen, faTrashAlt, faClock, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {SharedModule} from '../shared/shared.module';
import {HomeModule} from '../home/home.module';
import {ConfigService} from './services/config.service';

export function initializeApp(ahemProperties: ConfigService) {
  return () => ahemProperties.load();
}


library.add(faMeh, faEnvelope, faEnvelopeOpen, faBars, faTrash, faTrashAlt, faClock, faPaperPlane, faDove, faPaperclip);

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ApiDocumentationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    MatToolbarModule,
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    HomeModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    RouterModule,
    SharedModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true },
    ApiService,
    MatIconRegistry,
    DeviceService],
})
export class CoreModule { }
