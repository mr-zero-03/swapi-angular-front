import { Component, OnInit } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-vehiculos',
  standalone: true,
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.css',
  imports: [ ListComponent ]
} )

export class VehiculosComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  // Local data
  tableData: any[] = [];
  params: any[] = [];

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

  // Events
  ngOnInit(): void {
    this.apiService.getVehiculos().subscribe(
      ( data ) => {
        this.tableData = data;
        // console.log( this.tableData );
      },
      ( error ) => {
        console.error('Error al obtener los datos de vehiculos:', error);
      }
    );
  }

  // Getters
  getParams (): void {
    this.route.paramMap.subscribe( params => {
      // this.itemId = params.get('id');
      console.log( params );
    } );
  }
}
