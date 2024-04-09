import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrl: './get-orders.component.scss'
})
export class GetOrdersComponent implements AfterViewInit,OnInit{
  displayedColumns: string[] = ['id', 'customer', 'dateOrder','actions'];
  dataSource = new MatTableDataSource();

  constructor(private _service:CategoryService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this._service.getOrders().subscribe({
      next: (data:any) => {
        console.log(data);
        this.dataSource.data = data.orderHeaders;
      }
    })
  }

}
