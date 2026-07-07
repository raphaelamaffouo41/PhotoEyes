import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PhotographerCardComponent} from "../photographer-card/photographer-card.component";
import {Photographer} from "../../models/photographer.model";

@Component({
  selector: 'app-photographer-grid',
  standalone: true,
  imports: [PhotographerCardComponent],
  templateUrl: './photographer-grid.component.html',
  styleUrl: './photographer-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotographerGridComponent {
  @Input()
  photographers: Photographer[] = [];
}
