import {Component, Input} from '@angular/core';
import {PortfolioItem} from "../../models/portfolio-items";

@Component({
  selector: 'app-portfolio-gallery',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-gallery.component.html',
  styleUrl: './portfolio-gallery.component.css'
})
export class PortfolioGalleryComponent {
@Input({required:true})
  portfolio!: PortfolioItem[];
}
