import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Photographer } from '../../models/photographer.model';
import { FcfaPipe } from '../../../shared/ui/currency.pipe';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-photographer-card',
  standalone: true,
  imports: [FcfaPipe,RouterLink],
  templateUrl: './photographer-card.component.html',
  styleUrl: './photographer-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotographerCardComponent {
  @Input({ required: true }) photographer!: Photographer;

  /** Repli sur une image locale si l'URL distante échoue (pas d'image cassée). */
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/coin1.webp';
  }
}
