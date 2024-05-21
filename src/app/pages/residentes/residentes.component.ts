import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-residentes',
  standalone: true,
  templateUrl: './residentes.component.html',
  styleUrl: './residentes.component.css',
  imports: [ ListComponent ]
} )


export class ResidentesComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  // Local data
  tableData: any[] = [];
  params: object = {};

  columns: object[] = [
    { colName: 'name', show: true },
    { colName: 'height', show: true },
    { colName: 'mass', show: true },
    { colName: 'hair_color', show: false },
    { colName: 'skin_color', show: true },
    { colName: 'eye_color', show: false },
    { colName: 'birth_year', show: false },
    { colName: 'gender', show: true },
    { colName: 'homeworld', show: true },
    { colName: 'created', show: false },
    { colName: 'edited', show: false },
    { colName: 'url', show: false }
  ];

  // Events
  ngOnInit(): void {
    this.getResidentes();
    this.getParams();
  }

  // Getters
  getResidentes (): void {
    this.apiService.getResidentes().subscribe(
      ( data ) => {
        this.tableData = data;
        // console.log( this.tableData );
      },
      ( error ) => {
        console.error('Error al obtener los datos de residentes:', error);
      }
    );
  }
  getParams () {
    const URLParams = new URLSearchParams( window.location.search );
    let params = {};

    URLParams.forEach( ( value, key ) => {
      // params[ key ] = value;
      params = { ...params, ...{ [key]: value } }
    } );

    this.params = params;
    console.log( this.params );
  }
}
