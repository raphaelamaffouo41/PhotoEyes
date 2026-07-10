import { Component, Input } from '@angular/core';
import {PhotographerDetail} from "../../models/photographer-detail";

@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [],
  templateUrl: './about-carrd.component.html',
  styleUrl: './about-carrd.component.css'
})
export class AboutCarrdComponent {
  @Input({ required: true })
  bio!: string;

  @Input({ required: true })
  categories!: string[];
}
