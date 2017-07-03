import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdToolbarModule, MdInputModule, MdAutocompleteModule} from '@angular/material';


import { AppComponent } from './app.component';
import { MainContainerComponent } from './main-container/main-container.component';
import {ApiService} from "./api.service";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import { AccountSelectorComponent } from './account-selector/account-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    AccountSelectorComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdInputModule,
    MdAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
