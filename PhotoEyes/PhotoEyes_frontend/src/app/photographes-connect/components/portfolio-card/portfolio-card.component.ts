import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Portfolio } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.css'
})
export class PortfolioCardComponent {
  
  @Input()
  portfolio!:Portfolio;
  @Output()

  delete = new EventEmitter<number>();
  remove(){
  this.delete.emit(this.portfolio.id);
  }
}
