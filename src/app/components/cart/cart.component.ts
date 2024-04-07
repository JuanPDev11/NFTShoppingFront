import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private isLocalStorageAvailable = typeof localStorage !== 'undefined'; 
  carts!: any[];

  constructor(private _serviceC: CategoryService, private _serviceA:AccountService) { }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      
      this.getCarts();

    }
  }


  


  getCarts() {
    this._serviceC.getCart().subscribe({
      next: (data: any) => {
        console.log(data);
        this.carts = data;
      }
    })
  }

}
