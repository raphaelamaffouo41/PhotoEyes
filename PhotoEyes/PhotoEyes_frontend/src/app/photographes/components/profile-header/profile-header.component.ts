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

}
