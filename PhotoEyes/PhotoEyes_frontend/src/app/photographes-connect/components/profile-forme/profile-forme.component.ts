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

      this.form.specialites = this.dashboard.specialites || [];

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


  }

  isSelected(value:string){

    return this.form.specialites.includes(value);

  }

  save(){

  this.profileChange.emit({

        description: this.form.description,

        ville: this.form.ville,

        specialites:this.form.specialites

  });

  }

}
