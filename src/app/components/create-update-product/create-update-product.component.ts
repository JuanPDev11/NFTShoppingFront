import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../interface/category';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})



export class CreateUpdateProductComponent implements OnInit{
  product!: any[];
  product2!: any;
  form2: FormGroup;
  ID: number;

  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productImage?: string;
  productCategories!: any[];
  productArtists!: any[];
  productBid?: number;



  constructor(private _route:ActivatedRoute,private _service: CategoryService, private _fb:FormBuilder)
  {
    this.ID = Number(_route.snapshot.paramMap.get("id"))
    this.form2 = this._fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      File: [null],
      Category: [''],
      Artist: [''],
      Bid:['']
    });
  }

  ngOnInit(): void {
    this.getcreate();
  }

  submit() {

  }

  getcreate() {
    if (this.ID != undefined && this.ID != 0) {
      console.log("desde id");
      this._service.getCreUpd(this.ID).subscribe(data => {
        console.log(data);
        this.product2 = data;
        this.productName = data.product.name;
        this.productDescription = data.product.description;
        this.productPrice = data.product.price;
        this.productImage = data.product.imageUrl;
        this.productCategories = data.categories;
        this.productArtists = data.product.artistData;
        this.productBid = data.product.bid;

      });
    } else {
      console.log("desde sin id");
      this._service.getCreUpd().subscribe(data => {
        console.log(data);
        this.product2 = data;

      });
    }
  }

  
}
