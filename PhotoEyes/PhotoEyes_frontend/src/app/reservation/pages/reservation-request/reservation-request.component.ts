import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ReservationRequest } from '../../models/reservation-request.model';
import { PhotographerService } from '../../../accueil/service/photographerservice';
import { Photographer } from '../../../accueil/models/photographer.model';
import { PhotographerDetail } from '../../../photographes/models/photographer-detail';
import { MessageModalComponent } from '../../../shared/message-modal/message-modal.component';


@Component({

selector:'app-reservation-request',

standalone:true,

imports:[
FormsModule,MessageModalComponent
],

templateUrl:'./reservation-request.component.html',

styleUrls:[
'./reservation-request.component.css'
]

})


export class ReservationRequestComponent {

photographer!: Photographer
reservation:ReservationRequest={

    clientId: 1,
    photographerId: 1,

    date: '',
    heureDebut: '',
    heureFin: '',

    message: ''


};

showModal = false;

modalMessage = '';

modalType:'success' | 'error' = 'success';

openModal(message:string,type:'success'|'error'){

this.showModal=false;

setTimeout(()=>{

this.modalMessage=message;
this.modalType=type;
this.showModal=true;

},100);


}
constructor(
  private router: Router,
  private route:ActivatedRoute,
  private photographerService:PhotographerService,
  private reservationService:ReservationService
){}
    goToHome() {
    const currentUrl = this.router.url;
    
    this.router.navigate(['/']);
  }

  async sendReservation(){

    try{

    const response = await this.reservationService
    .createReservation(this.reservation);


    this.openModal("Votre réservation a été envoyée avec succès","success");


    }catch(error:any){

    console.error(error);


    this.openModal(error.error.message,"error");

    }

    }
      async ngOnInit(){

        const id = Number(this.route.snapshot.paramMap.get("photographerId"));

        this.photographer = await this.photographerService.getById(id);

        this.reservation.photographerId = this.photographer.id;

        // this.reservation.clientId = utilisateurConnecte.id;

      }


}
