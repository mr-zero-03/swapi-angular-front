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

  // Handlers
  prevPage = () => {
    this.pagination = this.prevPagination;

    if ( !this.params[ 'ids' ] ) { this.getPlanetas() }
  }
  nextPage = () => {
    this.pagination = this.nextPagination;
    if ( !this.params[ 'ids' ] ) { this.getPlanetas() }
  }

  // Events
  ngOnInit(): void {
    this.getParams();
    this.getPlanetas();
  }

  // Getters
  getPlanetas (): void {
    const ids: any[] = this.params[ 'ids' ] || [];

    this.apiService.getAllPlanetas( ids, this.pagination ).subscribe(
      ( data: any ) => {
        const prev = data[ 'previous' ] || '';
        const next = data[ 'next' ] || '';

        this.tableData = ( (ids.length > 0) ? data : data[ 'results' ] );
        this.prevPagination = parseInt( prev.slice( prev.indexOf( 'page=' ) ).replace( 'page=', '' ) );
        this.nextPagination = parseInt( next.slice( next.indexOf( 'page=' ) ).replace( 'page=', '' ) );
      },
      ( error ) => {
        console.error('Error al obtener los datos de planetas:', error);
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
