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
      name: 'Marlène Atangana',
      city: 'Yaoundé',
      speciality: 'Mariage & Événementiel',
      rating: 4.9,
      startingPrice: 45000,
      imageUrl: 'assets/coin1.webp',
      verified: true,
      category: 'Mariage'
    },
    {
      id: 2,
      name: 'julio',
      city: 'Douala',
      speciality: 'Portrait & Corporate',
      rating: 4.7,
      startingPrice: 35000,
      imageUrl: 'assets/coin2.webp',
      verified: true,
      category: 'Portrait'
    },
    {
      id: 3,
      name: 'julio',
      city: 'Douala',
      speciality: 'Portrait & Corporate',
      rating: 4.7,
      startingPrice: 35000,
      imageUrl: 'assets/coin2.webp',
      verified: true,
      category: 'Portrait'
    },
    {
      id: 4,
      name: 'julio',
      city: 'Douala',
      speciality: 'Portrait & Corporate',
      rating: 4.7,
      startingPrice: 35000,
      imageUrl: 'assets/coin2.webp',
      verified: true,
      category: 'Portrait'
    },
    {
      id: 5,
      name: 'julio',
      city: 'Douala',
      speciality: 'Portrait & Corporate',
      rating: 4.7,
      startingPrice: 35000,
      imageUrl: 'assets/coin2.webp',
      verified: true,
      category: 'Portrait'
    },
    {
      id: 6,
      name: 'julio',
      city: 'Douala',
      speciality: 'Portrait & Corporate',
      rating: 4.7,
      startingPrice: 35000,
      imageUrl: 'assets/coin2.webp',
      verified: true,
      category: 'Portrait'
    }
  ];

}
