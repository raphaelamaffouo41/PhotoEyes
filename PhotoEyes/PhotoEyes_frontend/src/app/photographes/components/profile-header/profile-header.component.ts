import { Component, Input } from '@angular/core';
import { Photographer } from '../../../accueil/models/photographer.model';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {

  @Input()
  photographer?: Photographer;
  getStarArray(): number[] {return [1, 2, 3, 4, 5];}
}
