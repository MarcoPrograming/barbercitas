import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private calendarId = 'Barber F.C';
  private baseUrl = 'https://www.googleapis.com/calendar/v3/calendars';

  constructor(private http: HttpClient) {}

  public getEvents(): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token') // Suponiendo que tienes un token de acceso almacenado en localStorage
    };

    return this.http.get(`${this.baseUrl}/${this.calendarId}/events`, { headers });
  }
}
