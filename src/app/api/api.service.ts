import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable( {
  providedIn: 'root'
} )

export class ApiService {
  constructor( private http: HttpClient ) { }

  private apiUrl = 'https://swapi.dev/api/';

  // Getters
  getPlanetas(): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/planets` ).pipe(
      map( data => data[ 'results' ] )
    );
  }
  getResidentes(): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/people` ).pipe(
      map( data => data[ 'results' ] )
    );
  }
  getVehiculos(): Observable<any> {
    return this.http.get<any>( `${this.apiUrl}/vehicles` ).pipe(
      map( data => data[ 'results' ] )
    );
  }
}
