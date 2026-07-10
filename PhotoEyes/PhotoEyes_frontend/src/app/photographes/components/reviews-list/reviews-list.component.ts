import {Component, Input} from '@angular/core';
import {Review} from "../../models/review";

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
@Input({required: true})
  reviews!: Review[];
  getStarArray(): number[] {return [1, 2, 3, 4, 5];}
}
