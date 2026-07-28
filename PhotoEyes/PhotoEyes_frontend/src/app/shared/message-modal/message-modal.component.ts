import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrl: './message-modal.component.css'
})
export class MessageModalComponent {
@Input()

show = false;

@Input()

message = '';

@Input()

type:'success' | 'error' = 'success';
}
