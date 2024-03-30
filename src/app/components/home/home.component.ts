import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { info } from 'console';
import { take } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  info: any;
  categories: any;
  constructor(private _serviceI: CategoryService) { }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      this.getInfo();
      this.getCategories();
    }
  }

  getInfo() {
    this._serviceI.getProduct().subscribe({
      next: (info:any[]) => {
        this.info = info.slice(0,12);
      }
    })
  }

  getCategories() {
    this._serviceI.homeCategories().subscribe({
      next: (response) => {
        console.log(response);
        this.categories = response;
      }
    })
  }



}
