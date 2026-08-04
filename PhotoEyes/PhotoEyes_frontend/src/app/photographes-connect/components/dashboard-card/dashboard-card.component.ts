import { Component, Input } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css'
})
export class DashboardCardComponent {
  @Input()

  dashboard!: PhotographerDashboard;

    get completion(){

    let total = 7;

    let completed = 0;


    if(this.dashboard.description)
      completed++;


    if(
      this.dashboard.specialites &&
      this.dashboard.specialites.length >0
    )
      completed++;


    if(this.dashboard.ville)
      completed++;


    if(
      this.dashboard.prixPortrait &&
      this.dashboard.prixDemiJournee &&
      this.dashboard.prixJournee
    )
      completed++;


    if(this.dashboard.imageUrl)
      completed++;


    if(
      this.dashboard.portfolio &&
      this.dashboard.portfolio.length >=5
    )
      completed++;


    return {

      completed,

      total,

      percent:(completed/total)*100

    }

  }


}

