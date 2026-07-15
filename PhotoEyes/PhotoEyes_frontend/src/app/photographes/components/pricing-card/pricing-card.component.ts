import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PricingItem} from "../../models/pricing-item";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.css'
})
export class PricingCardComponent {
  @Input({required: true})
  tarifs!:PricingItem[]

  @Input()
  canReserve = true;

  @Output()
  reserver = new EventEmitter<void>();
}
