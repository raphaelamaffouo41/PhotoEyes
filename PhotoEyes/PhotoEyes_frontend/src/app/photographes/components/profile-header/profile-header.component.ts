import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photographer } from '../../../accueil/models/photographer.model';
import { PhotographerDetail } from '../../models/photographer-detail';
import { VerifiedBadgeComponent } from "../../../shared/ui/verified-badge/verified-badge.component";
import { RatingStarsComponent } from "../../../shared/ui/rating-stars/rating-stars.component";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [VerifiedBadgeComponent, RatingStarsComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {

  @Input()
  photographer?: PhotographerDetail;

  @Input()
  canReserve = true;

  @Output()
  reserver = new EventEmitter<void>();

  getStarArray(): number[] {return [1, 2, 3, 4, 5];}
}
