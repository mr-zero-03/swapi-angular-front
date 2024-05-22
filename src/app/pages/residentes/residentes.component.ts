import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../api/api.service';

@Component( {
  selector: 'app-residentes',
  standalone: true,
  templateUrl: './residentes.component.html',
  styleUrl: './residentes.component.css',
  imports: [ ListComponent ]
} )

export class ResidentesComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) {}

  // Local data
  tableData: any[] = [];
  params: any = {};
  pagination: number = 0;
  prevPagination: number = 0;
  nextPagination: number = 0;
  loading: boolean = true;

  columns: object[] = [
    { colName: 'name', show: true },
    { colName: 'height', show: true },
    { colName: 'mass', show: true },
    { colName: 'hair_color', show: false },
    { colName: 'skin_color', show: true },
    { colName: 'eye_color', show: false },
    { colName: 'birth_year', show: false },
    { colName: 'gender', show: true },
    { colName: 'homeworld', show: false },
    { colName: 'created', show: false },
    { colName: 'edited', show: false },
    { colName: 'url', show: false }
  ];

  // Handlers
  prevPage = () => {
    this.pagination = this.prevPagination;

    if ( !this.params[ 'ids' ] ) { this.getResidentes() }
  }
  nextPage = () => {
    this.pagination = this.nextPagination;
    if ( !this.params[ 'ids' ] ) { this.getResidentes() }
  }

  // Events
  ngOnInit(): void {
    this.getParams();
    this.getResidentes();
  }

  // Getters
  getResidentes (): void {
    const ids: any[] = this.params[ 'ids' ] || [];

    this.apiService.getAllResidentes( ids, this.pagination ).subscribe(
      ( data: any ) => {
        const prev = data[ 'previous' ] || '';
        const next = data[ 'next' ] || '';

        this.tableData = ( (ids.length > 0) ? data : data[ 'results' ] );
        this.prevPagination = parseInt( prev.slice( prev.indexOf( 'page=' ) ).replace( 'page=', '' ) );
        this.nextPagination = parseInt( next.slice( next.indexOf( 'page=' ) ).replace( 'page=', '' ) );
        this.loading = false;
      },
      ( error ) => {
        console.error('Error al obtener los datos de residentes:', error);
        this.loading = false;
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
