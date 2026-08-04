import { Portfolio } from "../models/portfolio.model";

export interface PhotographerDashboard{

    id:number;

    nom:string;

    prenom:string;

    ville:string;

    description:string;
    
    imageUrl:string;

    photoCouverture:string;

    profilComplet:boolean;

    prixPortrait:number;

    prixDemiJournee:number;

    prixJournee:number;

    specialites:string[];

    portfolio:Portfolio[];

}