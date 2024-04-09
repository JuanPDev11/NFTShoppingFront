import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Navigation, NavigationStart, Router, Scroll ,Event as EventRouter} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private isWindowAvailable = typeof window !== 'undefined';
  private previouslyUrl!: string;

  ID!: number;
  info: any;
  product: any;
  products: any;

  formCart!: FormGroup;
  
  constructor(private _redirect: Router, private _service: CategoryService,
    private _route: ActivatedRoute, private _fb: FormBuilder, public app: AppComponent,
    private location:Location) {

    
      this.formCart = this._fb.group({
        count: ['',[Validators.min(1)]]
      });
    
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
      next: (data:any) => {
        console.log(data);
        this.product = data.productD;
        this.products = data.products;
        this.formCart.addControl('productId', new FormControl(this.product.id));
      }
    });   
  }

  submit() {
    if (this.formCart.valid) {
      const formData = new FormData();
      formData.append('productId', this.formCart.get('productId')?.value);
      formData.append('count', this.formCart.get('count')?.value);
      this._service.addCart(formData);

      this.location.back();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:'Please insert a quantity valid'
      })
    }
   
    
    
  }

  redirect(newId: number) {
    this._redirect.navigateByUrl(`/details/${newId}`, { skipLocationChange: true }).then(() => {
      this._redirect.navigate([this._redirect.url]);
      this.ngOnInit();

    })

  }
}
