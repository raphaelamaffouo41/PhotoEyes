import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardPhotographeService {

  private dashboardData = {
    statsTop: [
      { value: '1284', label: 'Utilisateurs', subtext: '942 clients - 342 photographes', icon: 'pi-users' },
      { value: '1,2 M', label: 'CA plateforme (mois)', subtext: 'commissions perçues', icon: 'pi-wallet' },
      { value: '216', label: 'Réservations (mois)', subtext: '↑ 12% vs mois dernier', icon: 'pi-calendar' },
      { value: '4,7', label: 'Satisfaction', subtext: 'moyenne plateforme', icon: 'pi-star' }
    ],
    statsQueue: [
      { value: '3', label: 'Demandes à traiter', icon: 'pi-bell' },
      { value: '2', label: 'Dossiers à valider', icon: 'pi-shield' },
      { value: '4', label: 'Livraisons à valider', icon: 'pi-upload' },
      { value: '1', label: 'Litiges ouverts', icon: 'pi-scale' }
    ],
    recentDemands: [
      { title: 'Anniversaire', code: '#RS-2033', client: 'Client #C-318', date: '12 juil. 2026', location: 'Yaoundé', time: 'il y a 12 min' },
      { title: 'Mariage', code: '#RS-2054', client: 'Client #C-402', date: '26 juil. 2026', location: 'Douala', time: 'il y a 48 min' },
      { title: 'Corporate', code: '#RS-2055', client: 'Client #C-377', date: '30 juin 2026', location: 'Yaoundé', time: 'il y a 2 h' }
    ]
  };

  constructor() { }

  // Méthode asynchrone qui retourne une Promesse
  async getDashboardData(): Promise<any> {
    // Simule un délai réseau avec un setTimeout (optionnel)
    return Promise.resolve(this.dashboardData);
  }
}