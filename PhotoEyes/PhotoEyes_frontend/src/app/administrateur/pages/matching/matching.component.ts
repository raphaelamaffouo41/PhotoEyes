import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchingService } from '../../service/matching.service';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent implements OnInit {
  demand: any = {};
  photographers: any[] = [];

  constructor(private matchingService: MatchingService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.matchingService.getMatchingData();
      this.demand = data.demandDetails;
      this.photographers = data.suggestedPhotographers;
    } catch (error) {
      console.error('Erreur lors du chargement du matching', error);
    }
  }

  assignMission(photographerName: string) {
    console.log(`Mission assignée à : ${photographerName}`);
    // Logique d'assignation ici
  }
}