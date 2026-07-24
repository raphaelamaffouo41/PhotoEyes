import {Injectable} from "@angular/core";
import { PhotographerDetail } from "../models/photographer-detail";
import {PricingItem} from "../models/pricing-item";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";
import { Photographer } from "../../accueil/models/photographer.model";
@Injectable({
  providedIn: 'root'
})

export class PhotoGrapherServices {
  private api = 'http://localhost:8080/api/photographers'
  constructor(private http: HttpClient) {}
  private readonly photographerDetails: PhotographerDetail[]=[
    { id: 1, nom: 'Marlène Atangana', ville: 'Yaoundé',  specialite: 'Mariage & Événementiel',description:"Photographe professionnelle spécialisée dans les mariages.",note: 4.9,noteMoyenne: 4.9,nombreAvis: 128, photoProfil:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg',certifie: true, bio:'Photographe professionnelle spécialisée dans les mariages et les portraits depuis plus de 10 ans.',categories:['Mariage','Cérémonie','Couple'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}],avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000},{libelle:'Demi-journée',prix: 85000},{libelle:'Journée complète',prix:150000}]},
    { id: 2, nom: 'Hervé Nkoulou',  ville: 'Douala' , specialite: 'Portrait & Corporate',description:'Direction artistique mode et éditorial. Collaborations avec créateurs locaux.',note: 4.9,noteMoyenne: 4.9,nombreAvis: 128,photoProfil:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg', certifie: true ,bio:'Spécialiste du portrait corporate et des shootings d\'entreprise. Studio mobile disponible.',categories:['Portrait','Corporate','Studio'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}],avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000}]},
    { id: 3, nom: 'Sandrine Bilong', ville: 'Yaoundé', specialite: 'Mode & Studio', description:'Photographe professionnelle spécialisée dans les mariages et les portraits depuis plus de 10 ans.',note: 4.9,noteMoyenne: 4.9,nombreAvis: 128, photoProfil:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg', certifie: true, bio:'Direction artistique mode et éditorial. Collaborations avec créateurs locaux.',categories:['Mode','Éditorial','Beauté'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.SrGTet6ABRt7aBBUdC5UmAHaE7?w=193&h=135&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.Lwbkc2wT3GyLpVI9yt6EvwHaFj?w=193&h=145&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}] ,avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000}]},
    { id: 4, nom: 'Aïcha Fouda',   ville: 'Douala',specialite: 'Grossesse & Naissance', description:'Couverture d\'événements culturels et concerts. Livraison rapide.',note: 4.9,noteMoyenne: 4.9,nombreAvis: 128, photoProfil:'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg', certifie: true ,bio:'Photographe maternité et nouveau-né, séances douces en studio cocooning.',categories:['Grossesse','Naissance','Famille'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}],avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000}]},
    { id: 5, nom: 'Patrick Mbarga',  ville: 'Bafoussam', specialite: 'Événementiel', description:'Photographe maternité et nouveau-né, séances douces en studio cocooning.', note: 4.9,noteMoyenne: 4.9,nombreAvis: 128,photoProfil:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg', certifie: false,bio:'Couverture d\'événements culturels et concerts. Livraison rapide.',categories:['Concert','Festival','Soirée'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}] ,avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000}]},
    { id: 6, nom: 'Joël Tchamba',  ville: 'Yaoundé',specialite: 'Immobilier & Produit', description:"Photographie immobilière et packshot produit pour e-commerce.",note: 4.9,noteMoyenne: 4.9,nombreAvis: 128, photoProfil:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',photoCouverture:'https://i.pinimg.com/736x/2c/31/05/2c3105ddc0687c238016e4f756c11830.jpg', certifie: true ,bio:'Photographie immobilière et packshot produit pour e-commerce.', categories:['Immobilier','Produit','Drone'],portfolio:[ {id: 1,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 2,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'},{id: 3,url: 'https://www.bing.com/th/id/OIP.6HCAqp2IPX_KcmEE1a7xeQHaKX?w=193&h=270&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=ImgAns&rm=2', label: 'Mariage'}],avis:[{id: 1, auteur: 'Estelle N',note:5,texte:'Marlène a sublimé notre mariage. Photos livrées dans les délais, qualité exceptionnelle',date:'il y a 2 sem.' },{id: 2, auteur: 'Boris K.',note:5,texte:'Très professionnelle, à l\'écoute. Je recommande vivement.',date:'il y a 1 mois' },{id: 3, auteur: 'Christelle A.',note:4,texte:'Belles photos, ambiance détendue le jour J.',date:'il y a 2 mois' }], tarifs:[{libelle:'Séance 1 heure',prix:45000}]}
  ];

  async getById(id: number): Promise<PhotographerDetail | undefined> {

      // données du backend
      let apiPhotographer: Photographer | null = null;
      
      try {

      apiPhotographer = await firstValueFrom(
      this.http.get<Photographer>(`${this.api}/${id}`)
      );
      }catch(error){

        console.log("Backend indisponible, utilisation du mock");

      }
      // données mock
      const mock = this.photographerDetails.find(
          p => p.id === id
      );

      if(!mock){
      return undefined;
      }


      return {
      ...mock,

      ...(apiPhotographer && {

      nom: apiPhotographer.nom,
      ville: apiPhotographer.ville,
      specialite: apiPhotographer.specialite,
    photoProfil: apiPhotographer.imageUrl,
    photoCouverture: apiPhotographer.photoCouverture,
    certifie: apiPhotographer.certifie,
    bio: apiPhotographer.description,
    note: apiPhotographer.noteMoyenne

      })
      };

  }
}
