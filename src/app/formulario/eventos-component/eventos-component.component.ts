import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-eventos-component',
  templateUrl: './eventos-component.component.html',
  styleUrl: './eventos-component.component.css'
})
export class EventosComponentComponent implements OnInit {
  events: any;

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.getEvents().subscribe((data) => {
      this.events = data.items;
    });
  }

}
