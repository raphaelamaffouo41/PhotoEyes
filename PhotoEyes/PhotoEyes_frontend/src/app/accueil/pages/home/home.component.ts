import { Component } from '@angular/core';
import {HeroSearchComponent} from "../../components/hero-search/hero-search.component";
import {FilterBarComponent} from "../../components/filter-bar/filter-bar.component";
import {PhotographerGridComponent} from "../../components/photographer-grid/photographer-grid.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSearchComponent,FilterBarComponent,PhotographerGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  photographers = [
    {
      id: 1,
      nom: 'Jean Dupont',
      ville: 'Douala',
      note: 4.8,
      prix: 30000
    },
    {
      id: 2,
      nom: 'Marie Foto',
      ville: 'Yaoundé',
      note: 4.5,
      prix: 25000
    }
  ];
}
