import {Component, Input} from '@angular/core';
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
  tarrif!:PricingItem[]

}
