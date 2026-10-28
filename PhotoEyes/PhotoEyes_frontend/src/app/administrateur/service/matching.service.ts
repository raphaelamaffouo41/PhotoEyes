import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private matchingData = {
    demandDetails: {
      status: 'EN ATTENTE',
      reference: '#RS-2033',
      client: 'Client #C-318',
      type: 'Anniversaire',
      date: '12 juil. 2026',
      creneau: '16h — 20h',
      ville: 'Yaoundé, Odza',
      budget: '40 000 FCFA',
      securityNote: "Vous seul connaissez l'identité du client et du photographe. Aucune des deux parties ne connaîtra l'autre."
    },
    suggestedPhotographers: [
      {
        name: 'Marlène Atangana',
        rating: 4.9,
        specialty: 'Mariage & Événementiel',
        location: 'Yaoundé',
        compatibility: '96%',
        available: true,
        availabilityText: 'Disponible le 12 juil.'
      },
      {
        name: 'Sandrine Bilong',
        rating: 4.8,
        specialty: 'Mode & Studio',
        location: 'Yaoundé',
        compatibility: '88%',
        available: true,
        availabilityText: 'Disponible le 12 juil.'
      },
      {
        name: 'Aïcha Fouda',
        rating: 5.0,
        specialty: 'Grossesse & Naissance',
        location: 'Douala',
        compatibility: '71%',
        available: false,
        availabilityText: 'Indisponible ce jour'
      }
    ]
  };

  constructor() { }

  // Méthode asynchrone retournant une Promesse
  async getMatchingData(): Promise<any> {
    return Promise.resolve(this.matchingData);
  }
}