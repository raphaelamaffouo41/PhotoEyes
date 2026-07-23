import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroSearchComponent } from '../../components/hero-search/hero-search.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { PhotographerGridComponent } from '../../components/photographer-grid/photographer-grid.component';
import { Photographer } from '../../models/photographer.model';
import { SearchCriteria } from '../../models/search-criteria.model';
import { PhotographerService } from '../../service/photographerservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroSearchComponent, FilterBarComponent, PhotographerGridComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  photographers: Photographer[] = [];
  message = '';
  hasSearched = false;

  constructor(private readonly photographerService: PhotographerService) {}

  async ngOnInit(): Promise<void> {
    this.photographers = await this.photographerService.getAll();
    console.log(this.photographers);
  }

  async onSearch(criteria: SearchCriteria): Promise<void> {
      this.hasSearched = true;

  //this.photographers = await this.photographerService.search(criteria);

  if (this.photographers.length === 0) {
    this.message = 'Photographe non répertorié';
  } else {
    this.message = '';
  }
  }
}
