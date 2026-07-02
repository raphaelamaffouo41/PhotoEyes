import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  photographers = [
    {
      id: 1,
      nom: 'Jean Dupont',
      ville: 'Douala',
      note: 4.8,
      prix: 30000
    },
    {
      id: 2,
      nom: 'Marie Foto',
      ville: 'Yaoundé',
      note: 4.5,
      prix: 25000
    }
  ];
}
