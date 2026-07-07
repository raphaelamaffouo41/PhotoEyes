import { Component } from '@angular/core';
import {CommonModule} from "@angular/common"
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isOpen = true;

  isPhotographer = false;

  selectClient() {
    this.isPhotographer = false;
  }

  selectPhotographer() {
    this.isPhotographer = true;
  }

}
