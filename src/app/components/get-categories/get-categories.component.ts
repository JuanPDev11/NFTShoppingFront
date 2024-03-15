import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interface/category';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.scss'
})


export class GetCategoriesComponent implements AfterViewInit,OnInit {
  displayedColumns: string[] = ['No.', 'Name', 'DisplayOrder', 'Actions'];
  dataSource = new MatTableDataSource<Category>();
  category$: Observable<Category[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private _categroyService: CategoryService, private _redirect:Router) {
    this.category$ = this._categroyService.getCategories();
    this.category$.subscribe(data => { this.dataSource.data = data });  
  }
    ngOnInit(): void {
      
    }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  RemoveCategory(id:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b0000',
      cancelButtonColor: '#a9a9a9',
      confirmButtonText:'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this._categroyService.deleteCategory(id).subscribe(data => {
          this._categroyService.getCategories().subscribe(data => {
            this.dataSource.data = data
          });  
        });
       
      }
    })
    
  }
}
