import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )

export class ApiService {
  constructor( private http: HttpClient ) { }

  private apiUrl = 'https://swapi.dev/api/';

  // Getters
  getAllData ( endpoint:string, pagination:number = 0 ): Observable<any> {
    const params = ( pagination ) ? `?page=${pagination}` : '';

    return this.http.get<any>( `${this.apiUrl}/${endpoint}/${params}` ).pipe(
      map( data => data )
    );
  }
  getDataId ( endpoint: string, id: any ): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/${endpoint}/${ (id) ? id : 'null' }` ).pipe(
      map( data => data )
    );
  }


  getAllPlanetas( ids:any[]=[], pagination:number=0 ): Observable<any> {
    if ( ids.length > 0 ) {
      const requests = ids.map( id => this.getDataId( 'planets', id ) );
      return( forkJoin( requests ) );
    } else {
      return( this.getAllData( 'planets', pagination ) );
    }
  }

  getAllResidentes( ids:any[]=[], pagination:number=0 ): Observable<any[]> {
    if ( ids.length > 0 ) {
      const requests = ids.map( id => this.getDataId( 'people', id ) );
      return( forkJoin( requests ) );
    } else {
      return( this.getAllData( 'people', pagination ) );
    }
  }

  getAllVehiculos( ids:any[]=[], pagination:number=0 ): Observable<any> {
    if ( ids.length > 0 ) {
      const requests = ids.map( id => this.getDataId( 'vehicles', id ) );
      return( forkJoin( requests ) );
    } else {
      return( this.getAllData( 'vehicles', pagination ) );
    }
  }
}
