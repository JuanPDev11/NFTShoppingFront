import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  carts: any;
  formOrder!: FormGroup;
  constructor(private _serviceC: CategoryService, private _fb: FormBuilder) {
    this.formOrder = _fb.group({
      name: ['',[Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postalCode: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this._serviceC.getSummary().subscribe({
      next: (data: any) => {
        console.log(data);
        this.carts = data;
        this.formOrder.patchValue({
          name: data.orderHeader.name,
          phone: data.orderHeader.phone,
          address: data.orderHeader.address,
          city: data.orderHeader.city,
          state: data.orderHeader.state,
        })
      }
    })
  }

  submit() {
    if (this.formOrder.valid) {
      const formData = new FormData();
      formData.append("name", this.formOrder.get("name")?.value);
      formData.append("phone", this.formOrder.get("phone")?.value);
      formData.append("address", this.formOrder.get("address")?.value);
      formData.append("city", this.formOrder.get("city")?.value);
      formData.append("state", this.formOrder.get("state")?.value);
      formData.append("postalCode", this.formOrder.get("postalCode")?.value);

      this._serviceC.postSummary(formData).subscribe({
        next: (data: any) => {
          window.location.href = data.url;
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Please complete fields form requireds'
      });
    }
    
  }

}
