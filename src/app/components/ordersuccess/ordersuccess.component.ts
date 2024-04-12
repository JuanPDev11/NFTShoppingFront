import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-ordersuccess',
  templateUrl: './ordersuccess.component.html',
  styleUrl: './ordersuccess.component.scss'
})
export class OrdersuccessComponent implements OnInit{
  private isLocal = this.app.isLocalStorageAvailable;
  ID!: number;
  orderId: any;
  constructor(private _serviceC:CategoryService,private _route:ActivatedRoute, public app:AppComponent)
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

  details() {
    this._serviceC.getDetails(this.orderId).subscribe({
      next: (data: any) => {
        Swal.fire({
          icon: 'info',
          title: 'Order Details',
          html: `<div style="text-align: left;">
                     <strong>Customer: </strong> ${data.orderHeader.applicationUser.name}<br>
                     <strong>Address: </strong> ${data.orderHeader.address}-${data.orderHeader.city}-${data.orderHeader.state}<br>
                     <strong>Order Status: </strong> ${data.orderHeader.orderStatus}<br>
                     <strong>Payment Status: </strong> ${data.orderHeader.paymentStatus}<br>
                     <strong>Your Order will be shipped within 3 to 5 working days</strong>
                 </div>`
        })
      }
    })
  }

}
