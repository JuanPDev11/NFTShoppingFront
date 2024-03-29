import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { max } from 'rxjs';


@Component({
  selector: 'app-get-artist',
  templateUrl: './get-artist.component.html',
  styleUrl: './get-artist.component.scss'
})



export class GetArtistComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Image', 'Name', 'Description', 'Age', 'Volume', 'TotalSold', 'Followers', 'Actions'];
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

  truncateText(text: string, maxlength: number): string {
    if (text.length <= maxlength) {
      return text;
    } else {
      return text.substring(0, maxlength) + ' ...';
    }
  }

  RemoveArtist(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b0000',
      cancelButtonColor: '#a9a9a9',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.delArtist(id).subscribe(data => {
          this._service.getArtists().subscribe(data => {
            this.dataSource.data = data
          });
        });

      }
    })
  }


}
