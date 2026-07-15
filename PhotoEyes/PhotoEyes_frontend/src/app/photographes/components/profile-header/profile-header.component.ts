import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photographer } from '../../../accueil/models/photographer.model';
import { PhotographerDetail } from '../../models/photographer-detail';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
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
