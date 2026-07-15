import {Component, Input} from '@angular/core';
import {Review} from "../../models/review";
import { RatingStarsComponent } from "../../../shared/ui/rating-stars/rating-stars.component";

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [RatingStarsComponent],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
@Input({required: true})
  avis!: Review[];
  getStarArray(): number[] {return [1, 2, 3, 4, 5];}
}
