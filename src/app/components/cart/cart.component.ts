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
  orders!: any;
  constructor(public _serviceC: CategoryService, private _serviceA:AccountService) { }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      /*this._serviceC.getCart();*/
      this.getCarts();

    }
  }

  getCarts() {
    this._serviceC.getCart();
    this._serviceC.cartObservable.subscribe({
      next: (data: any) => {
        console.log(data);
        this.carts = data;
        
      }
    })

    this._serviceC.getTotal().subscribe({
      next: (data: any) => {
        this.orders = data;
      }
    })
    
      
    
  }

  increment(count:number,productId:number) {
    this._serviceC.increment(count, productId).subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();

      }
    })
  }

  decrement(count:number,productId:number) {
    this._serviceC.decrement(count, productId).subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();

      }
    })
  }

  delete(id:number) {
    this._serviceC.deleteCart(id).subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();
      }
    })
  }

  deleteRange() {
    this._serviceC.deleteRange().subscribe({
      next: data => {
        console.log(data);
        this.ngOnInit();

      }
    })
  }

}
