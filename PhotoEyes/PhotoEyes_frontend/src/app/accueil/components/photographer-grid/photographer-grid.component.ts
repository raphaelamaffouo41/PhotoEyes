import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PhotographerCardComponent} from "../photographer-card/photographer-card.component";
import {Photographer} from "../../models/photographer.model";

@Component({
  selector: 'app-photographer-grid',
  standalone: true,
  imports: [CommonModule,PhotographerCardComponent],
  templateUrl: './photographer-grid.component.html',
  styleUrl: './photographer-grid.component.css'
})
export class PhotographerGridComponent {
  @Input()
  photographers: Photographer[] = [];
}
