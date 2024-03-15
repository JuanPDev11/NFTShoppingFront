import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-get-artist',
  templateUrl: './get-artist.component.html',
  styleUrl: './get-artist.component.scss'
})



export class GetArtistComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Image', 'Name', 'Description', 'Age', 'Volume', 'TotalSold', 'Followers'];
  dataSource = new MatTableDataSource();

  constructor(private _service: CategoryService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getArtists();
  }

  getArtists() {
    this._service.getArtists().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  RemoveArtist(int: number) {

  }


}
