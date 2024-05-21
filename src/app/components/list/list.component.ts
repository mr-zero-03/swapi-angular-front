import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component( {
  selector: 'list-elements',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  imports: [ MatTableModule, MatPaginatorModule ]
} )

export class ListComponent implements OnInit, OnChanges {
  // Props
  @Input() tableName: string = 'Tabla de Datos';
  @Input() tableData: any[] = [];
  @Input() columns: any[] = [];

  // Local props
  displayedColumns: string[] = [];

  // Events
  ngOnInit(): void {
  }
  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'columns' ] ) {
      this.setDisplayedColumns();

      // console.log( 'columns:', this.columns );
      // console.log( 'displayedColumns:', this.displayedColumns );
    }
  }

  // Setters
  setDisplayedColumns () {
    this.displayedColumns = this.columns
    .filter( item => item.show )
    .map( item => item.colName );
  }
}
