import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './pages/body/body.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaEmpleadoComponent } from './formulario/lista-empleado/lista-empleado.component';
import { ListaClienteComponent } from './formulario/lista-cliente/lista-cliente.component';
import { RegistrarClienteComponent } from './formulario/registrar-cliente/registrar-cliente.component';
import { ListarCitaComponent } from './formulario/listar-cita/listar-cita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { RegistrarCitaComponent } from './formulario/registrar-cita/registrar-cita.component';
import { HeaderComponent } from './pages/header/header.component';
import DataTable from 'datatables.net-dt';
import { RegistrarEmpleadoComponent } from './formulario/registrar-empleado/registrar-empleado.component';
import { EventosComponentComponent } from './formulario/eventos-component/eventos-component.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire/compat'
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    BienvenidoComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ListaEmpleadoComponent,
    ListaClienteComponent,
    RegistrarClienteComponent,
    ListarCitaComponent,
    RegistrarCitaComponent,
    HeaderComponent,
    RegistrarEmpleadoComponent,
    EventosComponentComponent
  ],
  imports: [
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
    provideFirebaseApp(() => initializeApp({"projectId":"citasbarber-744aa","appId":"1:630076519242:web:7c56feb6f2b3c12c5787b3","storageBucket":"citasbarber-744aa.appspot.com","apiKey":"AIzaSyAMZV3N3UWD7ooBjI-q2D9YFLeO61bWPwM","authDomain":"citasbarber-744aa.firebaseapp.com","messagingSenderId":"630076519242","measurementId":"G-FGMBS1SVYX"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp({"projectId":"citasbarber-744aa","appId":"1:630076519242:web:7c56feb6f2b3c12c5787b3","storageBucket":"citasbarber-744aa.appspot.com","apiKey":"AIzaSyAMZV3N3UWD7ooBjI-q2D9YFLeO61bWPwM","authDomain":"citasbarber-744aa.firebaseapp.com","messagingSenderId":"630076519242","measurementId":"G-FGMBS1SVYX"}),

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
