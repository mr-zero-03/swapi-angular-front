import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component( {
  selector: 'list-elements',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
} )

export class ListComponent implements OnInit, OnChanges {
  constructor (
    private router: Router
  ) {}

  // Props
  @Input() tableName: string = 'Tabla de Datos';
  @Input() gotoItems: string = '';
  @Input() tableData: any[] = [];
  @Input() columns: any[] = [];
  @Input() loading: boolean = true;
  @Input() prevButton: () => void = () => { console.log( 'Click on prevButton!' ) };
  @Input() nextButton: () => void = () => { console.log( 'Click on nextButton!' ) };

  // Click events
  prevButtonEvent () { this.prevButton() }
  nextButtonEvent () { this.nextButton() }
  onRowClick ( row: any ) {
    if ( ( this.gotoItems ) ) {
      const ids = row[ this.gotoItems ].map( ( item: any ) => {
        const arr = item.replaceAll( '/', ' ' ).trim().replaceAll( ' ', ',' ).split( ',' );
        const size = arr.length - 1;

        return( arr[ size ] );
      } ).join( ',' );

      const equival: { [key: string]: string } = {
        vehicles: 'vehiculos',
        residents: 'residentes'
      }

      const pageToGo = equival[ this.gotoItems ];

      const queryParams = {
        ids: ids
      };

      this.router.navigate( [ `/${pageToGo}` ], { queryParams } );
    }
  }

  // Local props
  displayedColumns: string[] = [];
  showData: boolean = false;

  // Events
  ngOnInit(): void {
  }
  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'columns' ] ) {
      this.setDisplayedColumns();
    }

    if ( changes[ 'tableData' ] ) {
      this.showData = ( this.tableData.length > 0 );
    }
  }

  // Setters
  setDisplayedColumns () {
    this.displayedColumns = this.columns
    .filter( item => item.show )
    .map( item => item.colName );
  }
}
