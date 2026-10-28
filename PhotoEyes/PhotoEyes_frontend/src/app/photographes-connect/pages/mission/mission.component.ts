import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsService, Mission } from '../../service/mission.service';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionsComponent implements OnInit {
  title = '';
  subtitle = '';
  missions: Mission[] = []

  constructor(private missionsService: MissionsService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.missionsService.getMissions();
      this.title = data.title;
      this.subtitle = data.subtitle;
      this.missions = data.missions;
    } catch (error) {
      console.error('Erreur lors du chargement des missions', error);
    }
  }

  acceptMission(mission: Mission) {
    console.log(`Mission acceptée : ${mission.reference}`);
    mission.typeAction = 'confirmed';
    mission.status = 'Confirmée';
    mission.isNew = false;
  }

  reportObstacle(mission: Mission) {
    console.log(`Empêchement signalé pour : ${mission.reference}`);
  }

  deliverPhotos(mission: Mission) {
    console.log(`Livraison des photos pour : ${mission.reference}`);
    mission.typeAction = 'delivered';
    mission.status = 'Livrée';
  }
}