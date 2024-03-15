import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-artist-creup',
  templateUrl: './artist-creup.component.html',
  styleUrl: './artist-creup.component.scss'
})
export class ArtistCreupComponent implements OnInit{
  ID!: number;
  artistF!: any;
  form3: FormGroup;
  file1!: File;

  constructor(private fb:FormBuilder,private _aroute: ActivatedRoute, private _redirect: Router, private _service: CategoryService) {
    this.ID = Number(_aroute.snapshot.paramMap.get("id"));
    this.form3 = this.fb.group({
      Name: [''],
      Description: [''],
      Age: [''],
      Volume: [''],
      TotalSold: [''],
      Followers: ['']
    });

  }

  uploadFile(event: any): void {
    this.file1 = event.target.files[0];
  }


  ngOnInit(): void {
    this.getArtist();
  }

  

  submit() {
    var formData = new FormData();
    formData.append('Name', this.form3.get('Name')!.value);
    formData.append('Description', this.form3.get('Description')!.value);
    formData.append('File', this.file1);
    formData.append('Age', this.form3.get('Age')!.value);
    formData.append('Volume', this.form3.get('Volume')!.value);
    formData.append('TotalSold', this.form3.get('TotalSold')!.value);
    formData.append('Followers', this.form3.get('Followers')!.value);

    if (this.ID != undefined && this.ID != 0) {
      this._service.crePostA(this.ID, formData).subscribe(data => {
        console.log(data);
        this._redirect.navigate(['/artistIndex']);
      })
    } else {
      this._service.crePostA(undefined, formData).subscribe(data => {
        console.log(data);
        this._redirect.navigate(['/artistIndex']);
      })
    }
  }

  getArtist() {
    if (this.ID != undefined && this.ID != 0) {
      this._service.getCreUpdA(this.ID).subscribe(data => {
        
        this.artistF = data;

        this.form3.patchValue({
          Name: data.name,
          Description: data.description,
          Age: data.age,
          Volume: data.volume,
          TotalSold: data.totalSold,
          Followers: data.followers
        });
        

      })
    } else {
      this._service.getCreUpdA().subscribe(data => {
        console.log(data);
      })
    }
  }


}
