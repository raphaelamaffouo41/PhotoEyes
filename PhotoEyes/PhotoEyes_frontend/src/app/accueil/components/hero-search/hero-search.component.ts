import { Component,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {

  keyword!:string;
  @Output()
  search = new EventEmitter<string>();

  onSearch(): void {
    this.search.emit(this.keyword);
  }
}
