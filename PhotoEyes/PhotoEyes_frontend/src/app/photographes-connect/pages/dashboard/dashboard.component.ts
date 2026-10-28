import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  DashboardPhotographeService } from '../../service/dashboard_photographe.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statsTop: any[] = [];
  statsQueue: any[] = [];
  recentDemands: any[] = [];

  constructor(private dashboardPhotographeService: DashboardPhotographeService) {}

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.dashboardPhotographeService.getDashboardData();
      this.statsTop = data.statsTop;
      this.statsQueue = data.statsQueue;
      this.recentDemands = data.recentDemands;
    } catch (error) {
      console.error('Erreur lors du chargement du tableau de bord', error);
    }
  }
}
