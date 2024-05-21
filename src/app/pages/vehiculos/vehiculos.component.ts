import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../api/api.service';

@Component( {
  selector: 'app-vehiculos',
  standalone: true,
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css',
  imports: [ ListComponent ]
} )

export class VehiculosComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {}

  // Local data
  tableData: any[] = [];
  params: any = {};
  pagination: number = 0;
  prevPagination: number = 0;
  nextPagination: number = 0;

  columns: object[] = [
    { colName: 'name', show: true },
    { colName: 'model', show: true },
    { colName: 'manufacturer', show: true },
    { colName: 'cost_in_credits', show: false },
    { colName: 'length', show: false },
    { colName: 'max_atmosphering_speed', show: true },
    { colName: 'crew', show: false },
    { colName: 'passengers', show: true },
    { colName: 'cargo_capacity', show: true },
    { colName: 'consumables', show: false },
    { colName: 'vehicle_class', show: true },
    { colName: 'created', show: false },
    { colName: 'edited', show: false },
    { colName: 'url', show: false },
    { colName: 'pilots', show: false },
    { colName: 'films', show: false }
  ];

  // Handlers
  prevPage = () => {
    this.pagination = this.prevPagination;

    if ( !this.params[ 'ids' ] ) { this.getVehiculos() }
  }
  nextPage = () => {
    this.pagination = this.nextPagination;
    if ( !this.params[ 'ids' ] ) { this.getVehiculos() }
  }

  // Events
  ngOnInit(): void {
    this.getParams();
    this.getVehiculos();
  }

  // Getters
  getVehiculos (): void {
    const ids: any[] = this.params[ 'ids' ] || [];

    this.apiService.getAllVehiculos( ids, this.pagination ).subscribe(
      ( data: any ) => {
        const prev = data[ 'previous' ] || '';
        const next = data[ 'next' ] || '';

        this.tableData = ( (ids.length > 0) ? data : data[ 'results' ] );
        this.prevPagination = parseInt( prev.slice( prev.indexOf( 'page=' ) ).replace( 'page=', '' ) );
        this.nextPagination = parseInt( next.slice( next.indexOf( 'page=' ) ).replace( 'page=', '' ) );
      },
      ( error ) => {
        console.error('Error al obtener los datos de Vehiculos:', error);
      }
    );
  }
  getParams () {
    const URLParams = new URLSearchParams( window.location.search );
    let params = {};

    URLParams.forEach( ( value, key ) => {
      let realValue: any;

      if ( key === 'ids' ) {
        realValue = value.split( ',' );
      }

      params = { ...params, ...{ [key]: realValue } }
    } );

    this.params = params;
  }
}
