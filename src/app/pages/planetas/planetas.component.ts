import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../api/api.service';

@Component( {
  selector: 'app-planetas',
  standalone: true,
  templateUrl: './planetas.component.html',
  styleUrl: './planetas.component.css',
  imports: [ ListComponent ]
} )

export class PlanetasComponent implements OnInit {
  constructor( private apiService: ApiService ) {}

  // Local data
  tableData: any[] = [];

  columns: object[] = [
    { colName: 'name', show: true },
    { colName: 'gravity', show: true },
    { colName: 'climate', show: true },
    { colName: 'created', show: false },
    { colName: 'diameter', show: true },
    { colName: 'edited', show: false },
    { colName: 'orbital_period', show: false },
    { colName: 'population', show: true },
    { colName: 'rotation_period', show: false },
    { colName: 'surface_water', show: false },
    { colName: 'terrain', show: true },
    { colName: 'url', show: false }
  ];

  // Events
  ngOnInit(): void {
    this.apiService.getPlanetas().subscribe(
      ( data ) => {
        this.tableData = data;
        // console.log( this.tableData );
      },
      ( error ) => {
        console.error('Error al obtener los datos de planetas:', error);
      }
    );
  }
}
