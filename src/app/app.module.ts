import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalculateSizePipe} from '../shared/calculate-size.pipe';
import {CalculateTimePipe} from '../shared/calculate-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFormComponent,
    CalculateSizePipe,
    CalculateTimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
