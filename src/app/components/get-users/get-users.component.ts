import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.scss'
})
export class GetUsersComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['name', 'userName', 'phone','emailConfirmed','actions'];
  dataSource = new MatTableDataSource();
  isAvailable = this.app.isLocalStorageAvailable;

  constructor(private _serviceC:CategoryService,public app:AppComponent) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }



  ngOnInit(): void {
    if (this.isAvailable) {
      this.getData();
    }
  }

  getData() {
    this._serviceC.getUsers().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      }
    })
  }

  RemoveProduct(id:number) {

  }

}
