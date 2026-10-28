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

    photographerId: 1,

    date: '',
    heureDebut: '',
    heureFin: '',

    message: '',
    typePrestation: '',
    lieu: '',
    delaiLivraison: ''


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

    this.saveDraft();
    if (!localStorage.getItem('token')) {
      await this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    try{

    const response = await this.reservationService
    .createReservation(this.reservation);

    sessionStorage.removeItem('photoeyes.reservationDraft');


    this.openModal("Votre réservation a été envoyée avec succès","success");


    }catch(error:any){

    console.error(error);


    this.openModal(error?.error?.message ?? "Impossible d'envoyer la réservation.","error");

    }

    }
      async ngOnInit(){

        const id = Number(this.route.snapshot.paramMap.get("photographerId"));

        this.photographer = await this.photographerService.getById(id);

        try {
          const draft = sessionStorage.getItem('photoeyes.reservationDraft');
          if (draft) {
            const saved = JSON.parse(draft);
            if (saved.photographerId === id) this.reservation = { ...this.reservation, ...saved };
          }
        } catch { sessionStorage.removeItem('photoeyes.reservationDraft'); }

        this.reservation.photographerId = this.photographer.id;

        // this.reservation.clientId = utilisateurConnecte.id;

      }

  saveDraft() {
    sessionStorage.setItem('photoeyes.reservationDraft', JSON.stringify(this.reservation));
  }


}
