import {Component, Input} from '@angular/core';
import {Photographer} from "../../models/photographer.model"
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-photographer-card',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './photographer-card.component.html',
  styleUrl: './photographer-card.component.css'
})
export class PhotographerCardComponent {
@Input({required: true})
  photographer!: Photographer;
}
