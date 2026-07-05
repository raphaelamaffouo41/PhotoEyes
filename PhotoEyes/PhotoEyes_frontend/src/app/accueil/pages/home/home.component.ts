import { Component } from '@angular/core';
import {HeroSearchComponent} from "../../components/hero-search/hero-search.component";
import {FilterBarComponent} from "../../components/filter-bar/filter-bar.component";
import {PhotographerGridComponent} from "../../components/photographer-grid/photographer-grid.component";
import {Photographer} from "../../models/photographer.model";
import {PhotographerService} from "../../service/photographerservice"
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSearchComponent,FilterBarComponent,PhotographerGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  photographers: Photographer[] = [];

  constructor(
    private photographerService: PhotographerService
  ) {}

  ngOnInit(): void {
    this.photographers =
      this.photographerService.getAll();
  }
}
