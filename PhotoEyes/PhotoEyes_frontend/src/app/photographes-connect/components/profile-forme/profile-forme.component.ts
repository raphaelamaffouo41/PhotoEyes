import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PhotographerDashboard } from '../../models/photographer-dashboard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-forme',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile-forme.component.html',
  styleUrl: './profile-forme.component.css'
})
export class ProfileFormeComponent {

  @Input()

  dashboard!: PhotographerDashboard;

  @Output()
  profileChange = new EventEmitter<any>();



  specialitesDisponibles = [

    "Mariage",
    "Portrait",
    "Corporate",
    "Mode",
    "Grossesse",
    "Événementiel",
    "Immobilier",
    "Produit"

  ];



  form = {
    description:'',

    ville:'',

    specialites:[] as string[]

  };




  ngOnChanges(){

    if(this.dashboard){

      this.form.description = this.dashboard.description || '';

      this.form.ville = this.dashboard.ville || '';

            const enumToLabel: Record<string, string> = {
        MARIAGE: 'Mariage', PORTRAIT: 'Portrait', CORPORATE: 'Corporate',
        MODE: 'Mode', GROSSESSE: 'Grossesse', EVENEMENT: 'Événementiel',
        IMMOBILIER: 'Immobilier', PRODUIT: 'Produit'
      };
      this.form.specialites = (this.dashboard.specialites || []).map(value => enumToLabel[value] ?? value);

    }

  }

  toggleSpecialite(value:string){


    if(this.form.specialites.includes(value)){


      this.form.specialites =
      this.form.specialites.filter(
        item=>item !== value
      );

    }

    else{

      this.form.specialites.push(value);

    }

    this.emitChanges();


  }

  isSelected(value:string){

    return this.form.specialites.includes(value);

  }

  save(){
    this.emitChanges();
  }

  emitChanges(){
  this.profileChange.emit({

        description: this.form.description,

        ville: this.form.ville,

        specialites:this.form.specialites

  });

  }

}
