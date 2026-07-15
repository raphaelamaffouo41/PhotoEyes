import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.css'
})
export class RatingStarsComponent {

  @Input({required:true})
  note!: number;

  getStarArray(): number[] {
    return [1,2,3,4,5];
  }

}
