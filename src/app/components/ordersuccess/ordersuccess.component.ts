import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrl: './ordersuccess.component.scss'
})
export class OrdersuccessComponent implements OnInit{
  private isLocal = typeof localStorage !== undefined;
  ID!: number;
  orderId: any;
  constructor(private _serviceC:CategoryService,private _route:ActivatedRoute)
  {
    this.ID = Number(this._route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    if (this.isLocal) {
      this.PaymentResult();
    }
  }

  PaymentResult() {
    this._serviceC.paymentRes(this.ID).subscribe({
      next: id => {
        this.orderId = id;
      }
    })
  }

}
