import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationCardComponent } from '../validation-card/validation-card.component';
import { ValidationService } from '../../service/validation.service'
import { AdminPhotographer } from '../../models/admin-photographer.model';
import { AdminService } from '../../service/admin.service';

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

  @Input()

  photographers:AdminPhotographer[]=[];

  demandes = this.validationService.getDemandes();

  constructor(

    private validationService:ValidationService,
    private adminService:AdminService

  ){}

  valider(id:number){

    console.log("Validation :",id);

  }

  refuser(id:number){

    console.log("Refus :",id);

  }

  async validate(userId:number){
    await this.adminService.validate(userId);
    this.photographers = this.photographers.filter(
    p=>p.userId!==userId
    );

  }

  async reject(userId:number){
    await this.adminService.reject(userId);
    this.photographers=this.photographers.filter(
    p=>p.userId!==userId
    );

  }
}