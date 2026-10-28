import { Injectable } from '@angular/core';

export interface Mission {
  title: string;
  reference: string;
  date: string;
  time: string;
  location: string;
  netPrice: string;
  status?: string;
  isNew?: boolean;
  typeAction?: 'accept_refuse' | 'deliver' | 'confirmed' | 'delivered';
}

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  private missionsData: Mission[] = [
    {
      title: 'Mariage',
      reference: '#RS-2048',
      date: '05 juil. 2026',
      time: '10h–18h',
      location: 'Yaoundé',
      netPrice: '162 000 FCFA',
      status: 'Confirmée',
      typeAction: 'confirmed'
    },
    {
      title: 'Baptême',
      reference: '#RS-2052',
      date: '09 juil. 2026',
      time: '14h–17h',
      location: 'Yaoundé',
      netPrice: '31 500 FCFA',
      isNew: true,
      typeAction: 'accept_refuse'
    },
    {
      title: 'Corporate',
      reference: '#RS-2019',
      date: '21 juin 2026',
      time: '09h–12h',
      location: 'Yaoundé',
      netPrice: '54 000 FCFA',
      typeAction: 'deliver'
    },
    {
      title: 'Portrait',
      reference: '#RS-1990',
      date: '02 juin 2026',
      time: '15h–17h',
      location: 'Yaoundé',
      netPrice: '36 000 FCFA',
      status: 'Livrée',
      typeAction: 'delivered'
    }
  ];

  constructor() { }

  // Méthode asynchrone retournant une Promesse
  async getMissions(): Promise<{ title: string; subtitle: string; missions: Mission[] }> {
    return Promise.resolve({
      title: 'Missions',
      subtitle: "Missions assignées par l'administrateur. Acceptez ou signalez un empêchement.",
      missions: this.missionsData
    });
  }
}