import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationCardComponent } from '../validation-card/validation-card.component';
import { ValidationService } from '../../service/validation.service'

@Component({

  selector:'app-validation-list',

  standalone:true,

  imports:[
    CommonModule,
    ValidationCardComponent
  ],

  templateUrl:'./validation-list.component.html',

  styleUrls:['./validation-list.component.css']

})
export class ValidationListComponent{

  demandes = this.validationService.getDemandes();

  constructor(

    private validationService:ValidationService

  ){}

  valider(id:number){

    console.log("Validation :",id);

  }

  refuser(id:number){

    console.log("Refus :",id);

  }

}