import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  ID!: number;
  info: any;
  product: any;
  products: any;

  constructor(private _service: CategoryService, private _route: ActivatedRoute) {
    this.ID = Number(_route.snapshot.paramMap.get("id"));
  }


  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._service.getInfo(this.ID).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data.productD;
        this.products = data.products;
      }
    })
  }

}
