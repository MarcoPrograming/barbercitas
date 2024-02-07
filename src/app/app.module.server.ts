import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import DataTable from 'datatables.net-dt';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]) ,
    BrowserAnimationsModule,
    DataTablesModule,
    ToastrModule.forRoot(),

  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
