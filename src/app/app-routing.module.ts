import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClienteComponent } from './formulario/lista-cliente/lista-cliente.component';
import { RegistrarClienteComponent } from './formulario/registrar-cliente/registrar-cliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ListarCitaComponent } from './formulario/listar-cita/listar-cita.component';
import { RegistrarCitaComponent } from './formulario/registrar-cita/registrar-cita.component';
import { ListaEmpleadoComponent } from './formulario/lista-empleado/lista-empleado.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { RegistrarEmpleadoComponent } from './formulario/registrar-empleado/registrar-empleado.component';
import { EventosComponentComponent } from './formulario/eventos-component/eventos-component.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
 {path: 'cliente', component: ListaClienteComponent },
 {path : 'RegistrarCliente', component: RegistrarClienteComponent},
 {path : 'dashboard', component: DashboardComponent},
  {path:'registrarCita', component: RegistrarCitaComponent},
  {path:'listarCita', component: ListarCitaComponent},
  {path:'login', component: LoginComponent},
  {path : 'home' , component: BienvenidoComponent},
  {path:'listaEmpleado', component: ListaEmpleadoComponent},
  {path:'RegistrarEmpleado', component:RegistrarEmpleadoComponent},
  {path: 'calendario' ,  component:EventosComponentComponent},
  {path:'registro',  component:RegisterComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
