import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completion-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completion-banner.component.html',
  styleUrl: './completion-banner.component.css'
})
export class CompletionBannerComponent {


@Input()

dashboard!:PhotographerDashboard;

@Output()

submit = new EventEmitter<void>();

get checks(){

  return [

    {
    label:'Description du profil',
    valid:
    !!this.dashboard?.description &&
    this.dashboard.description.trim() !== ''
    },

    {
    label:'Ville renseignée',
    valid:
    !!this.dashboard?.ville &&
    this.dashboard.ville.trim() !== ''
    },

    {
    label:'Photo de profil',
    valid:
    !!this.dashboard?.imageUrl
    },

    {
    label:'Photo couverture',
    valid:
    !!this.dashboard?.photoCouverture
    },

    {
    label:'Tarifs configurés',
    valid:
    this.dashboard?.prixPortrait != null &&
    this.dashboard?.prixDemiJournee != null &&
    this.dashboard?.prixJournee != null
    },

    {
    label:'Spécialités',
    valid:
    !!this.dashboard?.specialites &&
    this.dashboard.specialites.length>0
    },

    {
    label:'Portfolio',
    valid:
    !!this.dashboard?.portfolio &&
    this.dashboard.portfolio.length >=3
    }
   ];
  }

  get completed(){
    return this.checks.filter(

    item=>item.valid

    ).length;
  }

  get progress(){
    return Math.round(

    (this.completed / this.checks.length)*100

    );
  }
}
