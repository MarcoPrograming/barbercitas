import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../entity/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private baseURL="http://localhost:8080/api/v1/empleados";
  constructor(private httpClient : HttpClient) { }

  //Obtener Empleado
  obtenerListaEmpleado():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`) ;

  }

  registrarEmpleado(empleado:any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, empleado);
}

  //Actualizar Cliente
  actualizarEmpleado(empleado:any){
    const idTemp={
     ...empleado
    }
    delete idTemp.id;
    return this.httpClient.put(`${this.baseURL}/${empleado.id}`,idTemp);
  }
    //obtenerListaDelCliente
    obtnerEmpleadoPorID(id: number):Observable<Empleado>{
      return this.httpClient.get<Empleado>(`${this.baseURL}/${id}`);
    }

      //Eliminar

  eliminarEmpleado(id: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  seleccionarEmpleado(id:any){
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }
  GetAllInvoice(){
    return this.httpClient.get(`${this.baseURL}`);
  }




}
