import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../interface/category';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.scss'
})



export class CreateUpdateProductComponent implements OnInit{
  product2!: any;
  form2: FormGroup;
  ID: number;
  file1! : File;




  constructor(private _redirect:Router,private _route:ActivatedRoute,private _service: CategoryService, private _fb:FormBuilder)
  {
    this.ID = Number(_route.snapshot.paramMap.get("id"))
    this.form2 = this._fb.group({
      Name: [''],
      Description: [''],
      Price: [''],
      Category: [''],
      Artist: [''],
      Bid:['']
    });
  }

  ngOnInit(): void {
    this.getcreate();
  }

  uploadFile(event: any): void {
    this.file1 = event.target.files[0];
  }


  submit() {
    const formData = new FormData();
    formData.append('Name', this.form2.get('Name')!.value);
    formData.append('Description', this.form2.get('Description')!.value);
    formData.append('Price', this.form2.get('Price')!.value);
    formData.append('File', this.file1);
    formData.append('Category', this.form2.get('Category')!.value);
    formData.append('Artist', this.form2.get('Artist')!.value);
    formData.append('Bid', this.form2.get('Bid')!.value);

    if (this.ID != undefined && this.ID != 0) {
      this._service.postProduct(this.ID, formData).subscribe(data => {
        console.log(data);
        
        this._redirect.navigate(['/productIndex']);
      });
    } else {
      this._service.postProduct(undefined, formData).subscribe(data => {
        console.log(data);
        console.log(this.file1);
        this._redirect.navigate(['/productIndex']);
      });
    }
    
   }

  getcreate() {
    if (this.ID != undefined && this.ID != 0) {
      console.log("desde id");
      this._service.getCreUpd(this.ID).subscribe(data => {
        console.log(data);
        this.product2 = data;
        this.form2.patchValue({
          Name: data.product.name,
          Description : data.product.description,
          Price : data.product.price,      
          Category : data.product.category.id,
          Artist : data.product.artistData.id,
          Bid : data.product.bid
        })

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
