import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  constructor(private _serviceC:CategoryService) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this._serviceC.getSummary().subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
  }
}
