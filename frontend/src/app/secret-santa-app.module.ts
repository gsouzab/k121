import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SecretSantaAppComponent } from './secret-santa-app.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { PersonDetailsComponent } from './people/person-details/person-details.component';
import { FormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatTooltipModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';

import { FlexLayoutModule } from "@angular/flex-layout";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SecretSantaAppComponent,
    PeopleListComponent,
    PersonDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [SecretSantaAppComponent]
})
export class SecretSantaAppModule { }
