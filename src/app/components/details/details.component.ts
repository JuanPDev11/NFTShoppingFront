import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, Scroll } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private isWindowAvailable = typeof window !== 'undefined';
  ID!: number;
  info: any;
  product: any;
  products: any;
  
  constructor(private _redirect: Router, private _service: CategoryService, private _route: ActivatedRoute) {
    
  }


  ngOnInit(): void {
    this.ID = Number(this._route.snapshot.paramMap.get("id"));
    this.getData();
    if (this.isWindowAvailable) {
      window.scrollTo(0, 0);
    }
  }

  getData() {

    this._service.getInfo(this.ID).subscribe({
      next: (data) => {
        console.log(data);
        this.product = data.productD;
        this.products = data.products;
      }
    });   
  }

  redirect(newId: number) {
    this._redirect.navigateByUrl(`/details/${newId}`, { skipLocationChange: true }).then(() => {
      this._redirect.navigate([this._redirect.url]);
      this.ngOnInit();

    })

  }
}
