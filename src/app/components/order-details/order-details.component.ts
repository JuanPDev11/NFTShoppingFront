import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  
})
export class OrderDetailsComponent implements OnInit {
  color: ThemePalette = 'primary';
  
  showForm = true;
  ID!: number;
  formDetails!: FormGroup;
  productDetails: any;
  orderDetails: any;

  constructor(private _service:CategoryService,private _aroute: ActivatedRoute,private _fb:FormBuilder) {
    this.ID = Number(this._aroute.snapshot.paramMap.get("id"));
    this.formDetails = _fb.group({
      id:[this.ID],
      name: [{ value: '' ,disabled:true}],
      phone: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      dateOrder: [{ value: '', disabled: true }],
      orderStatus: [{ value: '', disabled: true }],
      paymentStatus: [{ value: '', disabled: true }],
      datePayment: [{ value: '', disabled: true }],
      carrier: [''],
      trackingNumber: [''],
    })
  }

  ngOnInit(): void {
    
    this.getDetails();
  }

  getDetails() {
    this._service.getDetails(this.ID).subscribe({
      next: (data: any) => {
        console.log(data);

        this.formDetails.patchValue({
          name:data.orderHeader.applicationUser.name,
          phone:data.orderHeader.applicationUser.phone,
          address:data.orderHeader.applicationUser.address,
          city:data.orderHeader.applicationUser.city,
          state:data.orderHeader.applicationUser.state,
          email: data.orderHeader.applicationUser.email,
          dateOrder: data.orderHeader.dateOfOrder,
          orderStatus: data.orderHeader.orderStatus,
          paymentStatus: data.orderHeader.paymentStatus,
          datePayment: data.orderHeader.dateOfPayment,
          carrier: data.orderHeader.carrier,
          trackingNumber: data.orderHeader.trackingNumber
        })
        this.productDetails = data.orderDetails;
        this.orderDetails = data.orderHeader;
      }
    })
  }

  submit() {
    if (this.formDetails.valid) {
      let formData = new FormData();
      formData.append("id", this.formDetails.get("id")?.value);
      formData.append("name", this.formDetails.get("name")?.value);
      formData.append("phone", this.formDetails.get("phone")?.value);
      formData.append("address", this.formDetails.get("address")?.value);
      formData.append("city", this.formDetails.get("city")?.value);
      formData.append("state", this.formDetails.get("state")?.value);
      formData.append("email", this.formDetails.get("email")?.value);
      formData.append("dateOrder", this.formDetails.get("dateOrder")?.value);
      formData.append("orderStatus", this.formDetails.get("orderStatus")?.value);
      formData.append("paymentStatus", this.formDetails.get("paymentStatus")?.value);
      formData.append("datePayment", this.formDetails.get("datePayment")?.value);
      formData.append("carrier", this.formDetails.get("carrier")?.value);
      formData.append("trackingNumber", this.formDetails.get("trackingNumber")?.value);

      this._service.updateOrder(formData).subscribe({
        next: (data: any) => {
          console.log(data);
          
        }
      })

      

    }

  }

  showFormMethod() {
    if (this.showForm) {
      this.showForm = false;
      this.formDetails.enable();
      Swal.fire({
        icon: 'warning',
        title: '¡ Warning !',
        text: 'It is not recommended to change any of the data already provided by the user and payment information... (this may cause shipping and/or payment verification problems).',
      });
    } else {
      this.showForm = true;
      this.formDetails.disable();
      this.formDetails.controls['carrier'].enable();
      this.formDetails.controls['trackingNumber'].enable();

    }
  }
}
