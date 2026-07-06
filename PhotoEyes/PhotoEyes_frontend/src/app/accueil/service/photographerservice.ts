import { Injectable } from '@angular/core';
import { Photographer } from '../models/photographer.model';

@Injectable({
  providedIn: 'root'
})
export class PhotographerService {

  private photographers: Photographer[] = [
    {
      id: 1,
      nom: 'Marlène Atangana',
      ville: 'Yaoundé',
      specialite: 'Mariage & Événementiel',
      note: 4.9,
      prixDepart: 45000,
      imageUrl: 'assets/images/coin1.webp',
      verifie: true
    },
    {
      id: 2,
      nom: 'Hervé Nkoulou',
      ville: 'Douala',
      specialite: 'Portrait & Corporate',
      note: 4.7,
      prixDepart: 35000,
      imageUrl: 'assets/images/coin2.webp',
      verifie: true
    },
    {
      id: 3,
      nom: 'Sandrine Bilong',
      ville: 'Yaoundé',
      specialite: 'Mode & Studio',
      note: 4.8,
      prixDepart: 60000,
      imageUrl: 'assets/images/coin1.webp',
      verifie: true
    }
  ];

  getAll(): Photographer[] {
    return this.photographers;
  }

  search(keyword: string) {
    return this.photographers.filter(
      p =>
        p.nom.toLowerCase().includes(keyword.toLowerCase()) ||
        p.specialite.toLowerCase().includes(keyword.toLowerCase())
    );
  }

}
