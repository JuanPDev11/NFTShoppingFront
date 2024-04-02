import { Component, OnInit } from '@angular/core';
import { Category } from '../../interface/category';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent implements OnInit{
  data: any;
  ID!: number;


  constructor(private _service: CategoryService, private _route: ActivatedRoute) {
    this.ID = Number(_route.snapshot.paramMap.get("id"));
  }


  ngOnInit(): void {
    this.getCreator();
  }

  getCreator() {
    this._service.getCreator(this.ID).subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
      }
    })
  }


}
