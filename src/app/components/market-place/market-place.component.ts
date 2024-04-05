import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.scss'
})
export class MarketPlaceComponent implements OnInit {

  itemsPerPages = 12;
  actualPage = 1;
  buttonPlus = false;
  buttonMinus = false;

  products: any;
  arrayPaginated: any;
  filters: any;
  searchText = "";

  constructor(private _service: CategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getPage();

    if (this.actualPage == 1) {
      this.buttonMinus = true;
    } else {
      this.buttonMinus = false;
    }

    if (this.products) {
      if (this.actualPage >= this.products.length / this.itemsPerPages) {
        this.buttonPlus = true;
      } else {
        this.buttonPlus = false;
      }
    }
  }

  getProducts() {
    this._service.getProduct().subscribe({
      next: (data) => {
        console.log(data);
        this.products = data;
        
      }
    })
  }

  onSearchChange(event:any) {
    this.searchText = event;
    this.filterProducts();
  }

  getPage() {
    const inicio = (this.actualPage - 1) * this.itemsPerPages;
    const fin = inicio + this.itemsPerPages;
    if (this.products) {
      this.arrayPaginated = this.products.slice(inicio, fin);

    }
    this.filterProducts();
  }

  minus(n: number) {
    if (this.actualPage == 1) {
      this.actualPage = n;
    } else {
      this.actualPage -= n;
    }
    this.ngOnInit();

  }

  plus(n: number) {
    if (this.actualPage == this.products.length / this.itemsPerPages) {
      this.actualPage = this.products.length / this.itemsPerPages;
    } else {
      this.actualPage += n;
    }
    this.ngOnInit();
    
  }

  start(n: number) {
    this.actualPage = n;
    this.ngOnInit();

  }

  end() {
    if (this.products) {
      this.actualPage = this.products.length / this.itemsPerPages;
      this.ngOnInit();

    }
  }


  filterProducts() {
    if (this.searchText) {
      this.filters = this.products.filter((product: any) => {
        return product.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.filters = this.arrayPaginated;
    }
  }

}
