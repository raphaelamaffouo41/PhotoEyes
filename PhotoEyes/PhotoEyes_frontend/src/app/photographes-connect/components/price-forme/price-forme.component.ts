import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-forme',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './price-forme.component.html',
  styleUrl: './price-forme.component.css'
})
  export class PriceFormeComponent {
  @Input()

  dashboard!: PhotographerDashboard;

  @Output()

  PriceForme= new EventEmitter<any>();

form={

  prixPortrait:0,

  prixDemiJournee:0,

  prixJournee:0

};

ngOnChanges(){

  if(this.dashboard){
      
    this.form.prixPortrait =
    this.dashboard.prixPortrait || 0;
    this.form.prixDemiJournee =
    this.dashboard.prixDemiJournee || 0;
    this.form.prixJournee =
    this.dashboard.prixJournee || 0;

  }

}

  save(){

  this.PriceForme.emit({

  prixPortrait:this.form.prixPortrait,

  prixDemiJournee:this.form.prixDemiJournee,

  prixJournee:this.form.prixJournee

  });

  }

  format(value:number){
    if(!value)
    return "0 FCFA";
    return value.toLocaleString('fr-FR')+" FCFA";

  }

}
