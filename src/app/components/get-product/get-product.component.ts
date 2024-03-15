import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrl: './get-product.component.scss'
})


export class GetProductComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = ['Image','Name', 'Description', 'Price', 'Category', 'Bid','Actions'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private _service:CategoryService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPr();
  }

  getPr() {
    this._service.getProduct().subscribe(data => {
      this.dataSource.data = data;
      
    })
  }

  RemoveProduct(id:number) {

  }

}
