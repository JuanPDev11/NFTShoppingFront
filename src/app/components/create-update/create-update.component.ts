import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../interface/category';
import { ActivatedRoute, Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss'
})



export class CreateUpdateComponent implements OnInit{
  category1?: any;
  ID: number;
  form1: FormGroup;
  categoryName!: string;
  categoryDisplay!: string;
  constructor(private _redirect:Router,private fb:FormBuilder , private _http: CategoryService , private _route:ActivatedRoute) {
    this.ID = Number(this._route.snapshot.paramMap.get('id'));
    this.form1 = this.fb.group({
      name: [''],
      displayOrder: ['']
    });
  }


  ngOnInit(): void {
    this.createCategory();
   
  }

  getCategoryName() {
    return this.category1 && this.category1.data ? this.category1.data.name : null;
  }


  submit() {
    const formData = new FormData();
    formData.append('name', this.form1.get('name')!.value);
    formData.append('displayOrder', this.form1.get('displayOrder')!.value);

    if (this.ID != 0) {
      this._http.createPost(this.ID, formData).subscribe(data => {
        console.log(data);
        if (data) {
          this._redirect.navigate(['/categoryIndex']);
        }
      })
    } else {
      this._http.createPost(undefined, formData).subscribe(data => {
        console.log(data);
        this._redirect.navigate(['/categoryIndex']);

      });
    }

    
  }





  createCategory() {
    if (this.ID != 0) {
      this._http.createUpdate(this.ID).subscribe(data => {
        this.category1 = data;
        this.categoryName = this.category1.data.name;
        this.categoryDisplay = this.category1.data.displayOrder;
      });
       
    } else {
      this._http.createUpdate().subscribe(data =>
        this.category1 = data);
        console.log(this.ID);

    }
  }

  

}
