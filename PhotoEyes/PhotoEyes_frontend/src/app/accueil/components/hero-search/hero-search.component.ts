import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchCriteria } from '../../models/search-criteria.model';
import { Photographer } from '../../models/photographer.model';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  keyword = '';
  city = '';

  @Output() search = new EventEmitter<SearchCriteria>();

  onSearch(): void {
    this.search.emit({ keyword: this.keyword.trim(), city: this.city.trim() });
  }
}
