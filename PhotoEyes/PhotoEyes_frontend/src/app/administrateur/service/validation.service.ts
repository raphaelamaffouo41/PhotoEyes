import { Injectable } from '@angular/core';
import { ValidationRequest } from '../models/validation-request.model';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private demandes: ValidationRequest[] = [

    {id:1,nom:'Patrick Mbarga',ville:'Bafoussam',categorie:'Événementiel',image:'https://images.unsplash.com/photo-1773332611573-5e5bfa8e5de5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8',cniValide:true,telephoneVerifie:true,nombrePhotos:8},
    { id:2,nom:'Linda Eyenga',ville:'Douala',categorie:'Mode',image:'https://plus.unsplash.com/premium_photo-1785080652560-f334e6ea704c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',cniValide:true,telephoneVerifie:true,nombrePhotos:6}

  ];

  getDemandes(){

    return this.demandes;

  }

}