import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from '../../interface/artists';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from '../../services/category.service';
import { DataSource } from '@angular/cdk/collections';
import { Scroll } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit{
  private isWindowAvailable = typeof window !== 'undefined';

  

  artists!: any[];
  filters!: any[];
  searchText = "";
  
  constructor(private _service:CategoryService) { }

  ngOnInit(): void {
    this.getRanking();
    if (this.isWindowAvailable) {
      window.scrollTo(0, 0);
    }
  }

 
  onSearchChange(event: any) {
    this.searchText = event;
    this.filterArtists();
  }
  

  getRanking() {
    this._service.getArtists().subscribe({
      next: (response:any[]) => {
        this.artists = response.sort((a, b) => b.totalSold - a.totalSold);
        this.filterArtists();
      }
    })
  }

  

  filterArtists() {
    if (this.searchText) {
      this.filters = this.artists.filter((artist: any) => {
        return artist.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else {
      this.filters = this.artists.slice();
    }
  }

}
