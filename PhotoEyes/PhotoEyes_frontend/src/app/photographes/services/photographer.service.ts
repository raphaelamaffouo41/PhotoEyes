import {Injectable} from "@angular/core";
import { PhotographerDetail } from "../models/photographer-detail";

@Injectable({
  providedIn: 'root'
})

export class PhotoGrapherService {
  private readonly photographerDetails: PhotographerDetail[]=[
    { id: 1, nom: 'Marlène Atangana',   specialite: 'Mariage & Événementiel',certifie: true, bio:'Photographe professionnelle spécialisée dans les mariages et les portraits depuis plus de 10 ans.',categories:['Mariage','Cérémonie','Couple'],portfolio:[ {id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},]},
    { id: 2, nom: 'Hervé Nkoulou',    specialite: 'Portrait & Corporate',  certifie: true ,bio:'Spécialiste du portrait corporate et des shootings d\'entreprise. Studio mobile disponible.',categories:['Portrait','Corporate','Studio'],portfolio:[{id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},]},
    { id: 3, nom: 'Sandrine Bilong',  specialite: 'Mode & Studio',   certifie: true, bio:'Direction artistique mode et éditorial. Collaborations avec créateurs locaux.',categories:['Mode','Éditorial','Beauté'],portfolio:[{id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},] },
    { id: 4, nom: 'Aïcha Fouda',      specialite: 'Grossesse & Naissance',   certifie: true ,bio:'Photographe maternité et nouveau-né, séances douces en studio cocooning.',categories:['Grossesse','Naissance','Famille'],portfolio:[{id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},]},
    { id: 5, nom: 'Patrick Mbarga',   specialite: 'Événementiel',    certifie: false,bio:'Couverture d\'événements culturels et concerts. Livraison rapide.',categories:['Concert','Festival','Soirée'],portfolio:[{id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},] },
    { id: 6, nom: 'Joël Tchamba',    specialite: 'Immobilier & Produit',  certifie: true ,bio:'Photographie immobilière et packshot produit pour e-commerce.', categories:['Immobilier','Produit','Drone'],portfolio:[{id: 1,url: 'assets/images/p1.jpg', label: 'Mariage'},]}
  ];

  async getById(id: number): Promise<PhotographerDetail | undefined> {
    return this.photographerDetails.find(
      p => p.id === id
    );
  }
}
