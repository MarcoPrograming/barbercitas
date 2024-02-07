import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Cliente } from '../entity/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  //Url es de Mysql  Backend
  private baseURL="http://localhost:8080/api/v1/clientes";

  constructor(private httpClient : HttpClient) { }

  //OBTIENE LOS Clientes
  obtenerListaDelCliente():Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(`${this.baseURL}`);
  }

  checkExistence(cliente: any): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseURL}`, cliente);
  }

  
  registrarCliente(cliente:any): Observable<Object>{
          return this.httpClient.post(`${this.baseURL}`, cliente);
  }
  
  

  // registrarCliente(cliente: any): Observable<Object> {
  //   return this.checkExistence(cliente).pipe(
  //     switchMap(exists => {
  //       try  {
  //         // Si el cliente ya existe, devuelve un error
  //         return throwError('El cliente ya existe');
  //       } catch{
  //         // Si el cliente no existe, realiza la solicitud POST para registrar
  //         return this.httpClient.post(`${this.baseURL}`, cliente);
  //       }
  //     }),
  //     catchError(error => {
  //       // Si ocurre cualquier otro error, propaga el error
  //       return throwError(error);
  //     })
  //   );
  // }
  

  //Actualizar Cliente
  actualizarCliente(clientes:any){
    const idTemp={
     ...clientes
    }
    delete idTemp.id;
    return this.httpClient.put(`${this.baseURL}/${clientes.id}`,idTemp);
  }
  // actualizarCliente(id:number, cliente:Cliente):Observable<Object>{
  //   return this.httpClient.put(`${this.baseURL}/${id}`,cliente);


  // }

  //obtenerListaDelCliente
  obtnerClientePorID(id: number):Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.baseURL}/${id}`);
  }

  //Eliminar

  eliminarCliente(id: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  seleccionarCliente(id:any){
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }


  ////////GENERAR PDF
  generarPDF(id: any){
    return this.httpClient.get(`${this.baseURL}/generatepdf?idNo=`+id ,{observe:'response', responseType:'blob'})
  }
  descargarPDF(id: number): Observable<Blob> {
    const options = {
      responseType: 'blob' as 'json', // Especifica que esperas una respuesta de tipo Blob
      headers: new HttpHeaders({
        'Accept': 'application/pdf' // Indica que esperas recibir un archivo PDF
      })
    };


    return this.httpClient.get<Blob>(`${this.baseURL}/descargar-pdf/${id}`, options);
  }
  
  GetAllInvoice(){
    return this.httpClient.get(`${this.baseURL}`);
  }


}
