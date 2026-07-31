import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ReservationRequest } from '../../models/reservation-request.model';
import { PhotographerService } from '../../../accueil/service/photographerservice';
import { Photographer } from '../../../accueil/models/photographer.model';
import { PhotographerDetail } from '../../../photographes/models/photographer-detail';


@Component({

selector:'app-reservation-request',

standalone:true,

imports:[
FormsModule
],

templateUrl:'./reservation-request.component.html',

styleUrls:[
'./reservation-request.component.css'
]

})


export class ReservationRequestComponent {

photographer!: Photographer
reservation:ReservationRequest={

clientId:1,

photographerId:1,

availabilityId:1,

message:''

};


constructor(
  private route:ActivatedRoute,

  private photographerService:PhotographerService,
  private reservationService:ReservationService
){}

  async sendReservation(){

    try{


    const response = await this.reservationService .createReservation(this.reservation);


    console.log(response);


    alert("Votre demande a été envoyée");


    }catch(error){console.error(error);

    alert("Erreur lors de la réservation");

    }


  }

  async ngOnInit(){

    const id = Number(this.route.snapshot.paramMap.get("photographerId"));

    this.photographer = await this.photographerService.getById(id);

    this.reservation.photographerId = this.photographer.id;

  }


}
