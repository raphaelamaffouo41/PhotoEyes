import { Component } from '@angular/core';

import { ValidationListComponent } from "../../components/validation-list/validation-list.component";

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [ ValidationListComponent],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {

}
