import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AccountModule } from '../../account/account.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrl: './market-place.component.scss'
})
export class MarketPlaceComponent implements OnInit {
  cat: string | null;
  selectedValue = "none";

  itemsPerPages = 12;
  actualPage = 1;
  buttonPlus = false;
  buttonMinus = false;

  perCategories = false;

  products: any;
  arrayPaginated: any;
  filters: any;
  searchText = "";

  categories = ["art", "collectibles", "music", "photography", "video", "utility","sport", "virtual","none"];

  constructor(private _service: CategoryService,private _route:ActivatedRoute) {
    this.cat = _route.snapshot.queryParams["cat"];

    console.log(this.cat)
    if (this.cat) {
      this.perCategories = true;
      if (this.cat == "Virtual Worlds") {
        this.selectedValue = "virtual"
      } else {
        this.selectedValue = this.cat.toLowerCase();

      }

    }
  }

  ngOnInit(): void {
    this.getProducts();

    

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
        console.log("from get products");

        const inicio = (this.actualPage - 1) * this.itemsPerPages;
        const fin = inicio + this.itemsPerPages;

        this.arrayPaginated = this.products.slice(inicio, fin);
        this.filterProducts();
        console.log("from get pages");
      }
    })

    
  }

  onSearchChange(event:any) {
    this.searchText = event;
    this.filterProducts();
  }

  onFilterCategories(event: any) {
    console.log(event.value);
    console.log(this.products);
    if (event.value != "none") {
      this.filters = this.products.filter((product: any) => {
        return product.category.name.toLowerCase().includes(event.value);
      });
      this.perCategories = true;
    } else {
      this.cat = null;
      this.filterProducts();
      this.perCategories = false;
    }
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
    //if (this.cat) {
    //  this.filters = this.products.filter((product: any) => {
    //    return product.category.name.toLowerCase().includes(this.selectedValue);
    //  });
    //  this.perCategories
    //}


    if (this.searchText) {
      this.filters = this.products.filter((product: any) => {
        
        return product.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
    else if (this.cat) {
      this.filters = this.products.filter((product: any) => {
        return product.category.name.toLowerCase().includes(this.selectedValue);
      });
    }
    else {
      this.filters = this.arrayPaginated;
      
    }
  }

}
